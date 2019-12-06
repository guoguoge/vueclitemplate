import router from './router'

router.beforeEach(async (to, from, next) => {
    console.log(to);

    next()
})

router.beforeResolve(async (to, from, next)=>{
    console.log(to);
    next()
})

router.afterEach(() => {
    // finish progress bar
});