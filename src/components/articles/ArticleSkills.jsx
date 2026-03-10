import "./ArticleSkills.scss"
import React, { useState } from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import {useUtils} from "/src/hooks/utils.js"
import Collapsable from "/src/components/capabilities/Collapsable.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useConstants} from "/src/hooks/constants.js"
import AvatarView from "/src/components/generic/AvatarView.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkills({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-skills`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleSkillsItems dataWrapper={dataWrapper}
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
function ArticleSkillsItems({ dataWrapper, selectedItemCategoryId }) {
    const constants = useConstants()
    const utils = useUtils()
    const viewport = useViewport()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const customBreakpoint = viewport.getCustomBreakpoint(constants.SWIPER_BREAKPOINTS_FOR_THREE_SLIDES)
    const customBreakpointId = customBreakpoint?.id
    const customBreakpointRowThreshold = customBreakpoint?.slidesPerView || 1

    const maxItemsPerRow = utils.number.clamp(dataWrapper.settings.maxItemsPerRow, 1, customBreakpointRowThreshold)
    const maxRowsCollapseThreshold = dataWrapper.settings.maxRowsCollapseThreshold

    const itemsPerRowClass = `article-skills-items-${Math.min(customBreakpointRowThreshold, maxItemsPerRow)}-per-row`

    const initialVisibleItemsCount = maxRowsCollapseThreshold ?
        maxItemsPerRow * maxRowsCollapseThreshold :
        filteredItems.length

    return (
        <Collapsable className={`article-skills-items ${itemsPerRowClass}`}
                     id={dataWrapper.uniqueId}
                     breakpointId={customBreakpointId}
                     initialVisibleItems={initialVisibleItemsCount}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleSkillsItem itemWrapper={itemWrapper}
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
function ArticleSkillsItem({ itemWrapper }) {
    const utils = useUtils()
    const avatarViewClass = itemWrapper.articleWrapper.settings.roundIcons ?
        `article-skills-item-avatar-round` :
        ``
    const experienceYears = itemWrapper.experienceYears
    const showExperienceBadge = utils.number.isValidNumber(experienceYears)
    const experienceLabel = experienceYears === 1 ? "1 year of experience" : `${experienceYears} years of experience`

    return (
        <div className={`article-skills-item`}>
            {showExperienceBadge && (
                <div className={`article-skills-item-experience-badge`} aria-label={`${experienceYears} years of experience`}>
                    {experienceLabel}
                </div>
            )}
            <div className={`article-skills-item-avatar-wrapper`}>
                <AvatarView src={itemWrapper.img}
                            faIcon={itemWrapper.faIconWithFallback}
                            style={itemWrapper.faIconStyle}
                            alt={itemWrapper.imageAlt}
                            className={`article-skills-item-avatar ${avatarViewClass}`}/>
            </div>

            <ArticleSkillsItemInfo itemWrapper={itemWrapper}/>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkillsItemInfo({ itemWrapper }) {
    const utils = useUtils()
    const level = itemWrapper.locales.level

    const displayLevel = utils.string.if(level, ` - ${level}`)
    const descriptionText = itemWrapper.locales.text

    return (
        <div className={`article-skills-item-info`}>
            <div className={`article-skills-item-title text-5`}>
                <div className={`article-skills-item-title-left-column`}>
                    <span className={`article-skills-item-title-main`}
                          dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

                    {displayLevel && (
                        <span className={`article-skills-item-title-suffix text-5`}
                              dangerouslySetInnerHTML={{__html: displayLevel}}/>
                    )}
                </div>
            </div>

            {descriptionText && (
                <div className={`article-skills-item-description`}
                     dangerouslySetInnerHTML={{__html: descriptionText}}/>
            )}
        </div>
    )
}

export default ArticleSkills
