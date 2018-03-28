//add to global scope
Pts.namespace(window)

var space = new CanvasSpace("#hello");
//space.setup({bgcolor: "#fff"})

var form = space.getForm()

space.add( () => {
    form.point(space.pointer, 10)
}
)

space.add( (time, ftime) => {
    var rect = Rectangle.fromCenter( space.center, space.size.$divide(2) )
    var poly = Rectangle.corners( rect )
    poly.shear2D( Num.cycle( time%5000/5000 ) - 0.5, space.center )

    //form.fillOnly("#123").polygon( poly )
    form.strokeOnly("#fff", 1).rect( rect )
})

space.play(200).bindMouse().bindTouch();

