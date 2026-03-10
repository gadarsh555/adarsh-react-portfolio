import "./SectionHeader.scss"
import React, {useEffect, useState} from 'react'
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useParser} from "/src/hooks/parser.js"

function SectionHeader({ section }) {
    const viewport = useViewport()
    const parser = useParser()

    const isMobileLayout = viewport.isMobileLayout()
    const parsedTitle = parser.parseSectionTitle(section)

    const titleClass = !isMobileLayout ?
        `lead-4` :
        ``

    const isAboutSection = section?.id === "about"
    const aboutModifier = isAboutSection ? `section-header-hero` : ``

    return (
        <header className={`section-header ${aboutModifier}`}>
            <div className={`section-header-inline`}>
                {isAboutSection ? (
                    <span className={`section-header-hero-gradient`}>
                        {parsedTitle.prefix && (
                            <>
                                <span dangerouslySetInnerHTML={{__html: parsedTitle.prefix}}/>
                                {" "}
                            </>
                        )}
                        <span dangerouslySetInnerHTML={{__html: parsedTitle.title}}/>
                    </span>
                ) : (
                    <>
                        {parsedTitle.prefix && (
                            <span className={`section-header-prefix lead-2`}>
                                <i className={`fa-solid fa-cubes`}/>
                                <span dangerouslySetInnerHTML={{__html: parsedTitle.prefix}}/>
                            </span>
                        )}
                        <h2 className={`section-header-title ${titleClass} h3`}
                            dangerouslySetInnerHTML={{__html: parsedTitle.title}}/>
                    </>
                )}
            </div>
        </header>
    )
}

export default SectionHeader