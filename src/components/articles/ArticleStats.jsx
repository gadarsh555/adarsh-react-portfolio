import "./ArticleStats.scss"
import React from 'react'
import Article from "/src/components/articles/base/Article.jsx"

/**
 * Displays quick stats (number + label) in a grid layout.
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleStats({ dataWrapper, id }) {
    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_SMALL}
                 dataWrapper={dataWrapper}
                 className={`article-stats`}
                 forceHideTitle={true}>
            <ArticleStatsItems dataWrapper={dataWrapper}/>
        </Article>
    )
}

function ArticleStatsItems({ dataWrapper }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(null)

    return (
        <div className={`article-stats-items`}>
            {filteredItems.map((itemWrapper) => (
                <ArticleStatsItem itemWrapper={itemWrapper} key={itemWrapper.uniqueId}/>
            ))}
        </div>
    )
}

function ArticleStatsItem({ itemWrapper }) {
    return (
        <div className={`article-stats-item`}>
            <h3 className={`article-stats-item-value`}
                dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>
            <p className={`article-stats-item-label`}
               dangerouslySetInnerHTML={{__html: itemWrapper.locales.text || ""}}/>
        </div>
    )
}

export default ArticleStats
