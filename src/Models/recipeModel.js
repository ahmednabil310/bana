
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recipeModel = new Schema({
    recipeName: {
        type: String,
        required: true
    },
    recipeDescription: {
        type: String,
        required: true
    },
    strength: {
        type: Number,
    },
    difficulty: {
        type: Number,
    },
    images: {
        type: Array,
    },
    video: {
        type: String,
    },
    numberOfServings: {
        type: Number,
    },
    steps: {
        type: Array,
        default: []
    },
    ingredients: [{
        ingredientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ingredient'
        },
        enteredAmount: {
            type: Number,
        },
        enteredUnit: {
            type: String,
        },
        convertedAmount: {
            type: Number,
        },
        conversionUnit: {
            type: String,
            default: 'mL.'
        },
        ingredientRatio: {
            type: Number
        }
    }],
    totalMoleAmount: {
        type: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approved: {
        type: String,
        default: 'pending'
    }
}, {
    collection: 'Recipes',
    timestamps: true
});

recipeModel.statics.getRecipes = async (filters, exact, page, approvalArray) => {
    const limit = 12;
    const skip = (page * limit) - limit;


    let match = {};
    if (filters && filters.ingredients) {
        // if (exact) match = { ingredientNames: { $size: filters.ingredients.length, $all: filters.ingredients } };
        if (exact) match.match = true;
        else match.ingredientNames = { $in: filters.ingredients }
    }
    if (filters && filters.difficulty) {
        match.difficulty = filters.difficulty
    }

    if (filters && filters.strength) {
        match.strength = filters.strength
    }

    if (filters && filters.owner) {
        match.owner = mongoose.Types.ObjectId(filters.owner);
    }

    if (approvalArray) {
        match.approved = { $in: approvalArray };
    }

    try {
        const recipes = await Recipe.aggregate([
            {
                $lookup: {
                    from: 'users',
                    let: { ownerId: '$owner' },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$ownerId"] } } },
                        //projecting only the needed data
                        { $project: { name: 1, email: 1 } },
                    ],
                    as: 'ownerData'
                }
            },
            //retrieving the owner data as object not array
            { $unwind: "$ownerData" },
            //for searching by ingredients
            {
                $lookup: {
                    from: 'ingredients',
                    localField: 'ingredients.ingredientId',
                    foreignField: '_id',
                    as: 'ingredientsData'
                }
            },
            {
                "$addFields": {
                    "ingredientNames": {
                        "$map": {
                            "input": "$ingredientsData",
                            "as": "el",
                            "in": "$$el.name"
                        }
                    }
                }
            },
            {
                $addFields: {
                    arraySize: { $size: "$ingredientNames" }
                }
            },
            ...(filters && filters.ingredients ? [
                { $addFields: { "match": { "$setIsSubset": ["$ingredientNames", filters.ingredients] } } },
            ] : []),

            { $match: match },

            //to sort final recipes list by recipe name
            { $sort: { createdAt: -1 } },
            {
                $facet: {
                    paginatedResults: [{ $skip: skip }, { $limit: limit }],
                    totalCount: [
                        {
                            $count: 'count'
                        }
                    ]
                }
            }
        ])

        return recipes;
    } catch (error) {
        console.log({ error: error.message })
        return error
    }

}

recipeModel.statics.getRecipeWithDetails = async (id) => {
    try {
        const recipes = await Recipe.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'users',
                    let: { ownerId: '$owner' },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$ownerId"] } } },
                        //projecting only the needed data
                        { $project: { name: 1, email: 1 } },
                    ],
                    as: 'ownerData'
                }
            },
            //retrieving the owner data as object not array
            { $unwind: "$ownerData" },

            { "$unwind": "$ingredients" },
            {
                $lookup: {
                    from: 'ingredients',
                    localField: 'ingredients.ingredientId',
                    foreignField: '_id',
                    as: 'ingredients.ingredientData'
                }
            },
            { $project: { 'ingredients.conversionUnit': 0, 'ingredients.ingredientId': 0, 'ingredients.ingredientData.createdAt': 0, 'ingredients.ingredientData.updatedAt': 0 } },
            { "$unwind": "$ingredients.ingredientData" },
            {
                "$group": {
                    "_id": "$_id",
                    "ingredients": { "$push": "$ingredients" },
                    "recipeName": { "$first": "$recipeName" },
                    "recipeDescription": { "$first": "$recipeDescription" },
                    "ownerData": { "$first": "$ownerData" },
                    "strength": { "$first": "$strength" },
                    "difficulty": { "$first": "$difficulty" },
                    "images": { "$first": "$images" },
                    "video": { "$first": "$video" },
                    "totalMoleAmount": { "$first": "$totalMoleAmount" },
                    "steps": { "$first": "$steps" },
                    "numberOfServings": { "$first": "$numberOfServings" },
                }
            },

        ])

        return recipes;
    } catch (error) {
        console.log(error.message)
        return error
    }

}

const Recipe = mongoose.model('recipe', recipeModel);

module.exports = Recipe;