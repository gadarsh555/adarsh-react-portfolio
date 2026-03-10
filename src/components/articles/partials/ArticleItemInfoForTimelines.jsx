import "./ArticleItemInfoForTimelines.scss";
import React, { useEffect, useState } from "react";
import { useViewport } from "/src/providers/ViewportProvider.jsx";
import DateBadge from "/src/components/widgets/DateBadge.jsx";
import { PropList, PropListItem } from "/src/components/generic/PropList.jsx";
import { Tags, Tag } from "/src/components/generic/Tags.jsx";
import ArticleItemPreviewMenu from "/src/components/articles/partials/ArticleItemPreviewMenu.jsx";
import { useLanguage } from "/src/providers/LanguageProvider.jsx";
import { useUtils } from "/src/hooks/utils.js";

/**
 * @param {*} children
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @param {Boolean} smallDateBadge
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelines({
  children,
  itemWrapper,
  className = "",
  smallDateBadge = false,
}) {
  const dateBadgeClass = smallDateBadge
    ? `article-timeline-item-info-for-timelines-date-badge-small`
    : ``;

  return (
    <div
      className={`article-timeline-item-info-for-timelines ${className} ${dateBadgeClass}`}
    >
      {children}
    </div>
  );
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @param {Boolean} dateInterval
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelinesHeader({
  itemWrapper,
  className = "",
  dateInterval = false,
  hideDateBadge = false,
}) {
  const viewport = useViewport();
  const utils = useUtils();
  const shouldShowDateBadge = !hideDateBadge && viewport.isBreakpoint("xl");
  const isSmallScreen = !viewport.isBreakpoint("sm");

  const institution = itemWrapper.locales.institution;

  const location =
    isSmallScreen && institution
      ? itemWrapper.shortLocation
      : itemWrapper.fullLocation;

  const propListItems = [];

  // Case 1 - The date is being displayed as a badge (no need to display it here).
  if (shouldShowDateBadge) {
    // Location is shown inline with institution
  }

  // Case 2 - Must display date inside the prop list (only if not hidden).
  else if (!hideDateBadge) {
    const hasStartDate =
      itemWrapper.dateStartDisplay &&
      itemWrapper.dateStartDisplay !== "date.null";
    const hasEndDate =
      itemWrapper.dateEndDisplay && itemWrapper.dateEndDisplay !== "date.null";

    if (hasStartDate || hasEndDate) {
      let dateValue = [];
      if (hasStartDate) dateValue.push(itemWrapper.dateStartDisplay);
      if (hasEndDate) dateValue.push(itemWrapper.dateEndDisplay);

      propListItems.push({
        faIcon: `fa-regular fa-clock`,
        type:
          dateInterval && hasStartDate && hasEndDate
            ? PropListItem.Types.INTERVAL
            : PropListItem.Types.SINGLE,
        value: dateValue,
      });
    }
    // Location is shown inline with institution
  }


  const titleHtml = utils.string.highlightMetrics(
    itemWrapper.locales.title || itemWrapper.placeholder || ""
  );

  return (
    <div
      className={`article-timeline-item-info-for-timelines-header ${className}`}
    >
      <div className={`article-timeline-item-info-for-timelines-header-title`}>
        <h5
          className={``}
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />

        {shouldShowDateBadge && (
          <DateBadge
            dateStart={itemWrapper.dateStartDisplay}
            dateEnd={dateInterval ? itemWrapper.dateEndDisplay : null}
            variant={DateBadge.Variants.DEFAULT}
            className={`article-timeline-item-info-for-timelines-header-date-badge`}
          />
        )}
      </div>

      {(institution || location) && (
        <div className={`article-timeline-item-info-for-timelines-institution`}>
          {institution && (
            <div className={`article-timeline-item-info-for-timelines-institution-name-block`}>
              {institution}
            </div>
          )}
          {location && (
            <div className={`article-timeline-item-info-for-timelines-institution-location-block`}>
              {location}
            </div>
          )}
        </div>
      )}

      {propListItems.length > 0 && (
        <PropList
          className={`article-timeline-item-info-for-timelines-header-prop-list text-1`}
          inlineBreakpoint={`xl`}
        >
          {propListItems.map((item, key) => (
            <PropListItem
              key={key}
              faIcon={item.faIcon}
              type={item.type}
              iconSpacing={isSmallScreen ? 25 : 30}
              value={item.value}
            />
          ))}
        </PropList>
      )}
    </div>
  );
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelinesBody({ itemWrapper, className = "", highlightAchievements = false, highlightExperience = false }) {
  const utils = useUtils();
  const textClass = `text-3`;

  let textHtml = utils.string.highlightMetrics(itemWrapper.locales.text || "");
  if (highlightAchievements) {
    textHtml = utils.string.highlightAchievementTerms(textHtml);
  } else if (highlightExperience) {
    textHtml = utils.string.highlightExperienceTerms(itemWrapper.locales.text || "");
  }

  return (
    <div
      className={`article-timeline-item-info-for-timelines-body ${className}`}
    >
      <div
        className={`article-timeline-item-info-for-timelines-body-text ${textClass}`}
        dangerouslySetInnerHTML={{ __html: textHtml }}
      />

      {itemWrapper.locales.list && itemWrapper.locales.list.length > 0 && (
        <ul
          className={`article-timeline-item-info-for-timelines-body-list list-mobile-small-padding ${textClass}`}
        >
          {itemWrapper.locales.list.map((item, key) => (
            <li
              className={`article-timeline-item-info-for-timelines-body-list-item`}
              key={key}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelinesImages({ itemWrapper, className = "" }) {
  const images = itemWrapper?.images || []
  if (!images.length) return <></>

  return (
    <div className={`article-timeline-item-info-images ${className}`}>
      {images.map((src, key) => (
        <img
          key={key}
          src={src}
          alt=""
          className="article-timeline-item-info-images-logo"
        />
      ))}
    </div>
  )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelinesTagsFooter({
  itemWrapper,
  className = "",
}) {
  return (
    <div
      className={`article-timeline-item-info-for-timelines-tags-footer ${className}`}
    >
      {itemWrapper.locales.tags && (
        <Tags
          className={`article-timeline-item-info-for-timelines-tags-footer-tag-list`}
        >
          {itemWrapper.locales.tags.map((tag, key) => (
            <Tag
              key={key}
              text={tag}
              className={`article-timeline-item-info-for-timelines-tags-footer-tag text-1`}
            />
          ))}
        </Tags>
      )}
    </div>
  );
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelinesPreviewFooter({
  itemWrapper,
  className = "",
}) {
  const hasScreenshotsOrVideo =
    itemWrapper.preview?.hasScreenshotsOrYoutubeVideo;
  const hasLinks = itemWrapper.preview?.hasLinks;
  const language = useLanguage();

  if (!hasScreenshotsOrVideo && !hasLinks) return <></>;

  return (
    <div className={`article-timeline-item-info-preview-footer ${className}`}>
      <div
        className={`article-timeline-item-info-preview-footer-title text-3`}
        dangerouslySetInnerHTML={{
          __html: language.getString("get_to_know_more"),
        }}
      />
      <ArticleItemPreviewMenu itemWrapper={itemWrapper} spaceBetween={false} />
    </div>
  );
}

export {
  ArticleItemInfoForTimelines,
  ArticleItemInfoForTimelinesHeader,
  ArticleItemInfoForTimelinesBody,
  ArticleItemInfoForTimelinesImages,
  ArticleItemInfoForTimelinesTagsFooter,
  ArticleItemInfoForTimelinesPreviewFooter,
};
