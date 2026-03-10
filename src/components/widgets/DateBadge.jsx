import "./DateBadge.scss"
import React, {useEffect, useState} from 'react'
import InfoBadge from "/src/components/generic/InfoBadge.jsx"

const isValidDate = (val) =>
    val && val !== "date.null" && String(val).trim() !== ""

function DateBadge({ dateStart, dateEnd, variant = "default", className = "" }) {
    const hasStart = isValidDate(dateStart)
    const hasEnd = isValidDate(dateEnd)

    if (!hasStart && !hasEnd) return null

    return (
        <div className={`date-badge-wrapper date-badge-wrapper-${variant} ${className}`}>
            <InfoBadge className={`date-badge w-100`}
                       faIcon={`fa-regular fa-calendar`}>
                {hasStart && (
                    <span className={``}
                          dangerouslySetInnerHTML={{__html: dateStart}}/>
                )}

                {hasStart && hasEnd && (
                    <i className={`fa-solid fa-arrow-right-long mx-2 opacity-75`}/>
                )}

                {hasEnd && (
                    <span className={``}
                          dangerouslySetInnerHTML={{__html: dateEnd}}/>
                )}
            </InfoBadge>
        </div>
    )
}

DateBadge.Variants = {
    DEFAULT: "default",
    TRANSPARENT: "transparent",
}

export default DateBadge