//add to global scope
Pts.namespace(window)

var space = new CanvasSpace("#hello");
//space.setup({bgcolor: "#fff"})

var form = space.getForm()

space.add( () => {
    form.point(space.pointer, 10)}
)

space.play(200).bindMouse().bindTouch();

