const express = require('express');
const router = new express.Router();
//imported auth
const memberAuth = require('../middleware/memberAuth');
const videoOwnerOrAdmin = require('../middleware/videoOwnerOrAdmin');
//imported models
const Video = require('../Models/videosModel');

//route to add a new video
router.post('/videos/add', memberAuth, async (req, res) => {
  const { cover, url, title, type, id } = req.body;

  try {

    if (id) {
      //here means we want to update the video

      const updatedVideo = await Video.findOneAndUpdate({ _id: id }, { $set: { cover, url, title } }, { new: true, useFindAndModify: false }, () => { });
      res.send(updatedVideo);
    } else {
      //here means we want to add a new video
      const videoData = { cover, url, title, owner: req.user._id };
      videoData.type = type === 'user' ? 'userVideo' : 'companyVideo';

      const video = new Video(videoData);
      await video.save();

      res.send(video)

    }
  } catch (error) {
    res.send({ error: error.message })
  }
})

//route to get all video
router.get('/videos', memberAuth, async (req, res) => {
  const { type } = req.query;

  let match = {};
  if (type === 'user') match = { owner: req.user._id };
  if (type === 'company') match = { type: 'companyVideo' };
  if (type === 'users') match = { type: 'userVideo' };

  try {
    const videos = await Video.aggregate([
      { $match: match },
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
      { $unwind: '$ownerData' }
    ]);

    res.send(videos);
  } catch (error) {
    res.send({ error: error.message })
  }
})

router.delete('/videos/:id', videoOwnerOrAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await Video.deleteOne({ _id: id })
    res.send('deleted');
  } catch (error) {
    res.send({ error: error.message })
  }
})

module.exports = router;