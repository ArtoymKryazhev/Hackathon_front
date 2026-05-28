import { useRef, useState } from 'react'

export function useDragScroll() {
  const scrollerRef = useRef(null)
  const dragRef = useRef({
    isDown: false,
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
    justDragged: false,
  })
  const [isDragging, setIsDragging] = useState(false)

  const onPointerDown = (e) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    if (e.button !== undefined && e.button !== 0) return

    dragRef.current.isDown = true
    dragRef.current.pointerId = e.pointerId
    dragRef.current.startX = e.clientX
    dragRef.current.startScrollLeft = scroller.scrollLeft
    dragRef.current.moved = false
    dragRef.current.justDragged = false
    setIsDragging(false)

    scroller.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    if (!dragRef.current.isDown) return

    const dx = e.clientX - dragRef.current.startX

    if (!dragRef.current.moved && Math.abs(dx) >= 8) {
      dragRef.current.moved = true
      setIsDragging(true)
    }

    if (dragRef.current.moved) {
      e.preventDefault()
    }

    scroller.scrollLeft = dragRef.current.startScrollLeft - dx
  }

  const endDrag = () => {
    const scroller = scrollerRef.current
    if (!scroller) return
    if (!dragRef.current.isDown) return

    dragRef.current.isDown = false
    dragRef.current.justDragged = dragRef.current.moved
    setIsDragging(false)

    if (dragRef.current.justDragged) {
      window.setTimeout(() => {
        dragRef.current.justDragged = false
      }, 50)
    }

    scroller.releasePointerCapture?.(dragRef.current.pointerId)
    dragRef.current.pointerId = null
  }

  const onClickCapture = (e) => {
    if (!dragRef.current.justDragged) return
    e.preventDefault()
    e.stopPropagation()
  }

  return {
    scrollerRef,
    isDragging,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
    },
  }
}
