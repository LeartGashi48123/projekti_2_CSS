class slideToggler
  
  constructor: (@el) ->
    
    return unless @el

    window.addEventListener 'resize', @getHeight
  
  getHeight: =>
    clone = @el.cloneNode(true)
    clone.style.cssText = 'visibility: hidden; display: block; margin: -999px 0'
    @height = (@el.parentNode.appendChild clone).clientHeight
    @el.parentNode.removeChild(clone)
    return @height
  
  toggle: (time) =>
    @getHeight()
    time or= @height / 3 + 150
    currHeight = @el.clientHeight * (getComputedStyle(@el).display != 'none')
    [start, end] = if currHeight > @height/2 then [@height,0] else [0,@height]
    disp = end - start
    el = @el
    
    @el.classList[ if end is 0 then 'remove' else 'add' ] 'open'
    @el.style.cssText = "overflow: hidden; display: block;"

    init = (new Date).getTime()

    repeat = ->
      instance = (new Date).getTime() - init
      step = start + disp * instance / time
      if instance <= time
        el.style.height = step + 'px' # if Math.floor(step) in [start..end]
      else
        el.style.cssText = "display: #{if end is 0 then 'none' else 'block'}"

      repeatLoop = requestAnimationFrame(repeat)
      cancelAnimationFrame repeatLoop unless Math.floor(step) in [start..end]
      
    repeat()
    
for block in document.querySelectorAll('.block')
  block.toggler = new slideToggler block

for trigger in document.querySelectorAll('button')
  trigger.addEventListener 'click', ->
    @parentNode.querySelector('.block').toggler?.toggle()

