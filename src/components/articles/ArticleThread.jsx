import "./ArticleThread.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import Collapsable from "/src/components/capabilities/Collapsable.jsx"
import {ArticleItemInfoForTimelines, ArticleItemInfoForTimelinesBody, ArticleItemInfoForTimelinesHeader, ArticleItemInfoForTimelinesImages, ArticleItemInfoForTimelinesPreviewFooter} from "/src/components/articles/partials/ArticleItemInfoForTimelines"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleThread({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-thread`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleThreadItems dataWrapper={dataWrapper} 
                                   selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleThreadItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const maxRowsCollapseThreshold = dataWrapper.settings.maxRowsCollapseThreshold
    const hideDateBadges = dataWrapper.settings?.hideDateBadges === true

    return (
        <Collapsable className={`article-thread-items`}
                     id={dataWrapper.uniqueId}
                     breakpointId={"any"}
                     initialVisibleItems={maxRowsCollapseThreshold}
                     itemsPerStep={3}
                     trailingItemComponent={ArticleThreadTrailingItem}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleThreadItem itemWrapper={itemWrapper}
                                   hideDateBadges={hideDateBadges}
                                   key={key}/>
            ))}
        </Collapsable>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleThreadItem({ itemWrapper, hideDateBadges = false }) {
    return (
        <div className={`article-thread-item`}>
            <div className={`article-thread-item-circle`}>
                <i className={`fa-solid fa-circle`}/>
            </div>

            <ArticleItemInfoForTimelines className={`article-thread-item-content`}
                                         smallDateBadge={true}>
                <ArticleItemInfoForTimelinesHeader itemWrapper={itemWrapper}
                                                   dateInterval={false}
                                                   hideDateBadge={hideDateBadges}/>

                <ArticleItemInfoForTimelinesBody itemWrapper={itemWrapper}
                                                 highlightAchievements={true}/>

                <ArticleItemInfoForTimelinesImages itemWrapper={itemWrapper}/>

                <ArticleItemInfoForTimelinesPreviewFooter itemWrapper={itemWrapper}/>
            </ArticleItemInfoForTimelines>
        </div>
    )
}

/**
 * @param {Boolean} hasMore
 * @return {JSX.Element}
 * @constructor
 */
function ArticleThreadTrailingItem({ hasMore }) {
    return (
        <div className={`article-thread-item article-thread-item-trailing`}>
            <div className={`article-thread-item-circle`}>
                <i className={hasMore ? `fa-solid fa-ellipsis opacity-50` : ``}/>
            </div>
        </div>
    )
}

export default ArticleThread
