module.exports =  function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        code:1,
        err
      };
    } else {
      throw err;
    }
  });
}