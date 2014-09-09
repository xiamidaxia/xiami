#Deps
- Deps.autorun({Function})
    @return {Computation}
- Deps.flush()
- Deps.nonreactive()
- Deps.active 
- Deps.currentComputation
- Dep.onInvalidate({Function})
- Deps.afterFlush(callback)

#Deps.Computaion
- stop()
- invalidate()
- onInvalidate()
- stopped
- invalidated
- firstRun

#Deps.Dependency
- changed()
- depend([fromComputation])
- hasDependents()
