import "./LayoutAnimatedBackground.scss"
import React, {useEffect, useState} from 'react'
import {useUtils} from "/src/hooks/utils.js"
import Animable from "/src/components/capabilities/Animable.jsx"

const utils = useUtils()

function LayoutAnimatedBackground() {
    const utils = useUtils()

    const canvas = document.getElementById(`layout-animated-background-canvas`)
    const context = canvas?.getContext("2d")

    const [circles, setCircles] = useState([])
    const maxCircles = 24

    const visibilityClass = utils.device.isAndroid() && !utils.device.isChromeAndroid() ?
        `d-none` :
        ``

    /** @constructs **/
    useEffect(() => {
        const circles = Array.from({ length: maxCircles }, () =>
            new CircleData(window.innerWidth, window.innerHeight)
        )

        setCircles(circles)
    }, [null])

    const _step = (event) => {
        for(const circle of circles) {
            circle.update(event.currentTickElapsed/0.017)
        }

        _draw(circles)
    }

    const _draw = (updatedCircles) => {
        if(!canvas || !context)
            return

        const backgroundColor = utils.css.getRootSCSSVariable("--theme-background")
        const circleColors = [
            utils.css.getRootSCSSVariable("--theme-circle-1"),
            utils.css.getRootSCSSVariable("--theme-circle-2"),
            utils.css.getRootSCSSVariable("--theme-circle-3"),
            utils.css.getRootSCSSVariable("--theme-circle-4")
        ].filter(Boolean)

        const backgroundColorRgba = backgroundColor ? utils.css.hexToRgba(backgroundColor, 1) : "rgba(10, 22, 40, 1)"

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        context.clearRect(0, 0, canvas.width, canvas.height)

        context.fillStyle = backgroundColorRgba
        context.fillRect(0, 0, canvas.width, canvas.height)

        updatedCircles.forEach(circle => {
            const colorHex = circleColors.length > 0 ? circleColors[circle.colorIndex % circleColors.length] : null
            if (!colorHex || typeof circle.colorIndex !== 'number') return

            context.beginPath()
            context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
            context.fillStyle = utils.css.hexToRgba(colorHex, circle.opacity / 2)
            context.fill()
        })
    }

    return (
        <Animable className={`layout-animated-background ${visibilityClass}`}
                  animationId={`layout-animated-background`}
                  onEnterFrame={_step}>
            <canvas id={`layout-animated-background-canvas`}/>
        </Animable>
    )
}

class CircleData {
    constructor() {
        this.reset()
        this.didEnter = true
    }

    randomizeProps() {
        const baseSize = Math.max(window.innerWidth, window.innerHeight)
        this.radius = utils.number.random(baseSize/24, baseSize/8)
        this.speedX = utils.number.random(3, 10, true)
        this.speedY = utils.number.random(2, 5, true)
        this.colorIndex = Math.floor(Math.random() * 4)
        this.opacity = 0.1 + Math.random()*0.9
    }

    update(dt) {
        this.x += this.speedX/2 * dt
        this.y += this.speedY/2 * dt

        const outOfBounds = this.isOutOfBounds()
        if(!this.didEnter) {
            this.didEnter = outOfBounds
        }
        else if(outOfBounds) {
            this.reset()
        }
    }

    isOutOfBounds() {
        return (
            this.x + this.radius*2 < 0 ||
            this.x - this.radius*2 > window.innerWidth ||
            this.y + this.radius*2 < 0 ||
            this.y - this.radius*2 > window.innerHeight
        )
    }

    reset() {
        this.randomizeProps()

        const direction = utils.number.random(0, 3)
        switch (direction) {
            case 0: // Left
                this.x = -this.radius*2
                this.y = utils.number.random(0, window.innerHeight)
                this.speedX = Math.abs(this.speedX)
                break
            case 1: // Right
                this.x = window.innerWidth + this.radius*2
                this.y = utils.number.random(0, window.innerHeight)
                this.speedX = -1* Math.abs(this.speedX)
                break
            case 2: // Top
                this.x = utils.number.random(0, window.innerWidth)
                this.y = -this.radius*2
                this.speedY = Math.abs(this.speedY)
                break
            case 3: // Bottom
                this.x = utils.number.random(0, window.innerWidth)
                this.y = window.innerHeight + this.radius*2
                this.speedY = -1*Math.abs(this.speedY)
                break
        }

        this.didEnter = false
    }
}

export default LayoutAnimatedBackground