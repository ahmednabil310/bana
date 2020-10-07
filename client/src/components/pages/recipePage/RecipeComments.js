import React from 'react'

const RecipeComments = () => {
  return (
    <ul className="uk-comment-list uk-margin-medium-top">
      <li>
        <article className="uk-comment uk-visible-toggle" tabIndex="-1">
          <header className="uk-comment-header uk-position-relative">
            <div className="uk-grid-medium uk-flex-middle" data-uk-grid>
              <div className="uk-width-auto">
                <img className="uk-comment-avatar uk-border-circle" src="https://via.placeholder.com/100x100" width="50" height="50" alt="Alice Thomson" />
              </div>
              <div className="uk-width-expand">
                <h4 className="uk-comment-title uk-margin-remove"><a className="uk-link-reset" href="/">Alice Thomson</a></h4>
                <p className="uk-comment-meta uk-margin-remove"><a className="uk-link-reset" href="/">12 days ago</a></p>
                <div className="uk-rating">
                  <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.8"></span>
                  <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.8"></span>
                  <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.8"></span>
                  <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.8"></span>
                  <span data-uk-icon="icon: star; ratio: 0.8"></span>
                </div>
              </div>
            </div>
            <div className="uk-position-top-right uk-position-small uk-hidden-hover"><a className="uk-link-muted" href="/">Reply</a>
            </div>
          </header>
          <div className="uk-comment-body">
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
                    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          </div>
        </article>
        <ul>
          <li>
            <article className="uk-comment uk-comment-primary uk-visible-toggle uk-border-rounded" tabIndex="-1">
              <header className="uk-comment-header uk-position-relative">
                <div className="uk-grid-medium uk-flex-middle" data-uk-grid>
                  <div className="uk-width-auto">
                    <img className="uk-comment-avatar uk-border-circle" src="https://via.placeholder.com/100x100" width="50" height="50" alt="Tom Solender" />
                  </div>
                  <div className="uk-width-expand">
                    <h4 className="uk-comment-title uk-margin-remove"><a className="uk-link-reset" href="/">Tom Solender</a></h4>
                    <p className="uk-comment-meta uk-margin-remove-top"><a className="uk-link-reset" href="/">12 days ago</a></p>
                  </div>
                </div>
                <div className="uk-position-top-right uk-position-small uk-hidden-hover"><a className="uk-link-muted"
                  href="/">Reply</a></div>
              </header>
              <div className="uk-comment-body">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
              </div>
            </article>
          </li>
          <li>
            <article className="uk-comment uk-visible-toggle" tabIndex="-1">
              <header className="uk-comment-header uk-position-relative">
                <div className="uk-grid-medium uk-flex-middle" data-uk-grid>
                  <div className="uk-width-auto">
                    <img className="uk-comment-avatar uk-border-circle" src="https://via.placeholder.com/100x100" width="50" height="50" alt="Alice Thomson" />
                  </div>
                  <div className="uk-width-expand">
                    <h4 className="uk-comment-title uk-margin-remove"><a className="uk-link-reset" href="/">Alice Thomson</a></h4>
                    <p className="uk-comment-meta uk-margin-remove"><a className="uk-link-reset" href="/">12 days ago</a></p>
                    <div className="uk-rating">
                      <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.8"></span>
                      <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.8"></span>
                      <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.8"></span>
                      <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.8"></span>
                      <span data-uk-icon="icon: star; ratio: 0.8"></span>
                    </div>
                  </div>
                </div>
                <div className="uk-position-top-right uk-position-small uk-hidden-hover"><a className="uk-link-muted"
                  href="/">Reply</a></div>
              </header>
              <div className="uk-comment-body">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
              </div>
            </article>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default RecipeComments
