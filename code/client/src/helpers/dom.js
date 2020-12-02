export const useScrollOffset = () =>
  // todo: Implement scroll offset
  ({
    x: 0,
    y: 0,
  })

export const useElementPosition = element => {
  const container = element.getBoundingClientRect()
  const scrollOffset = useScrollOffset()
  return {
    x: container.x + scrollOffset.x,
    y: container.y + scrollOffset.y,
  }
}
