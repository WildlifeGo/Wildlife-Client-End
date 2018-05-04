'use strict';

//TODO: I still don't understand how to implement page js very well. Go back and reference book code. Right now, I don't think this is actually doing anything.

page('/', () => app.parkView.initHomePage());
// , (ctx, next) => app.adminView.verify(ctx, next)
page('/client-wildlife', () => app.parkView.initHomePage());

page();