# TOC

   - [Iteration assertion](#iteration-assertion)
     - [.be.iteration](#iteration-assertion-beiteration)
     - [.not.be.iteration](#iteration-assertion-notbeiteration)
   - [Effect assertion](#effect-assertion)
     - [.be.effect](#effect-assertion-beeffect)
     - [not.be.an.effect](#effect-assertion-notbeaneffect)
   - [Effects](#effects)
     - [take(pattern)/takem(pattern)](#effects-takepatterntakempattern)
       - [.be.takeEffect](#effects-takepatterntakempattern-betakeeffect)
       - [.not.be.takeEffect](#effects-takepatterntakempattern-notbetakeeffect)
       - [.to.take(pattern)](#effects-takepatterntakempattern-totakepattern)
       - [.not.to.take(pattern)](#effects-takepatterntakempattern-nottotakepattern)
     - [put(action)](#effects-putaction)
       - [.be.putEffect](#effects-putaction-beputeffect)
       - [.not.be.putEffect](#effects-putaction-notbeputeffect)
       - [.to.put(action)](#effects-putaction-toputaction)
       - [.not.to.put(action)](#effects-putaction-nottoputaction)
     - [join/cancel(task)](#effects-joincanceltask)
       - [.be.joinEffect/cancelEffect](#effects-joincanceltask-bejoineffectcanceleffect)
       - [.not.be.joinEffect/cancelEffect](#effects-joincanceltask-notbejoineffectcanceleffect)
       - [.to.join/cancel(task)](#effects-joincanceltask-tojoincanceltask)
       - [.not.to.join/cancel(task)](#effects-joincanceltask-nottojoincanceltask)
     - [select(pattern)](#effects-selectpattern)
       - [.be.selectEffect](#effects-selectpattern-beselecteffect)
       - [.not.be.selectEffect](#effects-selectpattern-notbeselecteffect)
       - [.to.select(selector)](#effects-selectpattern-toselectselector)
       - [.not.to.select(selector)](#effects-selectpattern-nottoselectselector)
       - [.to.select(selector).withArgs(...args)](#effects-selectpattern-toselectselectorwithargsargs)
       - [.to.select(selector).withoutArgs(..args)](#effects-selectpattern-toselectselectorwithoutargsargs)
<a name=""></a>
 
<a name="iteration-assertion"></a>
# Iteration assertion
<a name="iteration-assertion-beiteration"></a>
## .be.iteration
does not fail if tested object has `done` and `value` keys.

```js
const iteration = { done: false, value: null };
expect(iteration).to.be.an.iteration;
iteration.should.be.an.iteration;
```

<a name="iteration-assertion-notbeiteration"></a>
## .not.be.iteration
does not fail if tested object does not have `done` or `value` key.

```js
const notIterationObject = { value: 42 };
expect(null).not.to.be.an.iteration;
expect(undefined).not.to.be.an.iteration;
expect(42).not.to.be.an.iteration;
expect(notIterationObject).not.to.be.an.iteration;
notIterationObject.should.not.be.an.iteration;
```

<a name="effect-assertion"></a>
# Effect assertion
<a name="effect-assertion-beeffect"></a>
## .be.effect
does not fail if tested object is redux-saga effect.

```js
expect(take('ACTION')).to.be.an.effect;
expect(takem('ACTION')).to.be.an.effect;
expect(put({ type: 'ACTION' })).to.be.an.effect;
expect(race([])).to.be.an.effect;
expect(call(noop)).to.be.an.effect;
expect(apply({}, noop)).to.be.an.effect;
expect(cps(noop)).to.be.an.effect;
expect(fork(noop)).to.be.an.effect;
expect(spawn(noop)).to.be.an.effect;
expect(join(mockTask)).to.be.an.effect;
expect(cancel(mockTask)).to.be.an.effect;
expect(actionChannel('ACTION')).to.be.an.effect;

take('ACTION').should.be.an.effect;
takem('ACTION').should.be.an.effect;
put({ type: 'ACTION' }).should.be.an.effect;
race([]).should.be.an.effect;
call(noop).should.be.an.effect;
apply({}, noop).should.be.an.effect;
cps(noop).should.be.an.effect;
fork(noop).should.be.an.effect;
spawn(noop).should.be.an.effect;
join(mockTask).should.be.an.effect;
cancel(mockTask).should.be.an.effect;
actionChannel('ACTION').should.be.an.effect;
```

<a name="effect-assertion-notbeaneffect"></a>
## not.be.an.effect
does not fail if tested object is not a redux-saga effect.

```js
const notEffectObject = { value: 42 };

expect(null).not.to.be.an.effect;
expect(undefined).not.to.be.an.effect;
expect(42).not.to.be.an.effect;
expect(notEffectObject).not.to.be.an.effect;

notEffectObject.should.not.be.an.effect;
```

<a name="effects"></a>
# Effects
<a name="effects-takepatterntakempattern"></a>
## take(pattern)/takem(pattern)
<a name="effects-takepatterntakempattern-betakeeffect"></a>
### .be.takeEffect
does not fail if tested object is `take` effect.

```js
const effect = take('ACTION');

expect(effect).to.be.takeEffect;
effect.should.be.takeEffect;
```

<a name="effects-takepatterntakempattern-notbetakeeffect"></a>
### .not.be.takeEffect
does not fail if tested object is not `take` effect.

```js
const notTakeEffectObject = put({ type: 'ACTION' });

expect(null).not.to.be.an.takeEffect;
expect(undefined).not.to.be.an.takeEffect;
expect(42).not.to.be.an.takeEffect;
expect(notTakeEffectObject).not.to.be.an.takeEffect;

notTakeEffectObject.should.not.be.an.takeEffect;
```

<a name="effects-takepatterntakempattern-totakepattern"></a>
### .to.take(pattern)
does not fail if tested object is `take` effect yielded from generator.

```js
function* testSaga() {
  yield take('*');
  yield take();
  yield take('ACTION');
  yield take(['ACTION1', 'ACTION2', 'ACTION3']);
  yield take(action => action.type.startsWith('IMPORTANT'));
}

const gen = testSaga();
const steps = [];
let next = gen.next();

while (!next.done) {
  steps.push(next);
  next = gen.next();
}

expect(steps[0]).to.take('ACTION');
expect(steps[1]).to.take('ACTION');

expect(steps[0]).to.take(['ACTION1', 'ACTION2', 'ACTION3']);
expect(steps[1]).to.take(['ACTION1', 'ACTION2', 'ACTION3']);

expect(steps[2]).to.take('ACTION');
steps[2].should.take('ACTION');

expect(steps[3]).to.take(['ACTION1', 'ACTION2', 'ACTION3']);
expect(steps[3]).to.take(['ACTION1', 'ACTION2']);
expect(steps[3]).to.take('ACTION1');
steps[3].should.take(['ACTION1', 'ACTION2', 'ACTION3']);
steps[3].should.take(['ACTION1', 'ACTION2']);
steps[3].should.take('ACTION1');

expect(steps[4]).to.take('IMPORTANT_ACTION');
steps[4].should.take('IMPORTANT_ACTION');
```

<a name="effects-takepatterntakempattern-nottotakepattern"></a>
### .not.to.take(pattern)
does not fail if tested object is not `take` effect yielded from generator.

```js
function* testSaga() {
  yield take('ACTION');
  yield take(['ACTION1', 'ACTION2', 'ACTION3']);
  yield take(action => action.type.startsWith('IMPORTANT'));
}

const gen = testSaga();

const first = gen.next();
const second = gen.next();
const third = gen.next();

expect(first).not.to.take('NOT_ACTION');
first.should.not.take('NOT_ACTION');

expect(second).not.to.take('WRONG_ACTION');
expect(second).not.to.take(['FOO', 'BAR', 'BAZ']);
second.should.not.take('WRONG_ACTION');
second.should.not.take(['FOO', 'BAR', 'BAZ']);

expect(third).not.to.take('NOT_IMPORTANT_ACTION');
third.should.not.take('NOT_IMPORTANT_ACTION');
```

<a name="effects"></a>
# Effects
<a name="effects-putaction"></a>
## put(action)
<a name="effects-putaction-beputeffect"></a>
### .be.putEffect
does not fail if tested object is `put` effect.

```js
const effect = put({ type: 'ACTION' });

expect(effect).to.be.putEffect;
effect.should.be.putEffect;
```

<a name="effects-putaction-notbeputeffect"></a>
### .not.be.putEffect
does not fail if tested object is not `put` effect.

```js
const notPutEffectObject = take('ACTION');

expect(null).not.to.be.an.putEffect;
expect(undefined).not.to.be.an.putEffect;
expect(42).not.to.be.an.putEffect;
expect(notPutEffectObject).not.to.be.an.putEffect;

notPutEffectObject.should.not.be.an.putEffect;
```

<a name="effects-putaction-toputaction"></a>
### .to.put(action)
does not fail if tested object is `put` effect with correct action yielded from generator.

```js
function* testSaga() {
  yield put({ type: 'ACTION' });
  yield put({ type: 'ACTION', payload: 42 });
}

const gen = testSaga();
const first = gen.next();
const second = gen.next();

expect(first).to.put({ type: 'ACTION' });
expect(second).to.put({ type: 'ACTION', payload: 42 });
```

<a name="effects-putaction-nottoputaction"></a>
### .not.to.put(action)
does not fail if tested object is `put` effect with incorrect action.

```js
function* testSaga() {
  yield put({ type: 'ACTION' });
  yield put({ type: 'OTHER_ACTION', payload: 42 });
}

const gen = testSaga();
const first = gen.next();
const second = gen.next();

expect(first).not.to.put({ type: 'OTHER_ACTION' });
expect(second).not.to.put({ type: 'OTHER_ACTION' }); // no payload
```

<a name="effects"></a>
# Effects
<a name="effects-joincanceltask"></a>
## join/cancel(task)
<a name="effects-joincanceltask-bejoineffectcanceleffect"></a>
### .be.joinEffect/cancelEffect
does not fail if tested object is `join/cancel` effect.

```js
const joinEffect = join(mockTask);
const cancelEffect = cancel(mockTask);

expect(joinEffect).to.be.joinEffect;
expect(cancelEffect).to.be.cancelEffect;
```

<a name="effects-joincanceltask-notbejoineffectcanceleffect"></a>
### .not.be.joinEffect/cancelEffect
does not fail if tested object is not `join/cancel` effect.

```js
const invalidEffect = take('ACTION');

expect(null).not.to.be.an.joinEffect;
expect(undefined).not.to.be.an.joinEffect;
expect(42).not.to.be.an.joinEffect;
expect(invalidEffect).not.to.be.an.joinEffect;

invalidEffect.should.not.be.an.joinEffect;

expect(null).not.to.be.an.cancelEffect;
expect(undefined).not.to.be.an.cancelEffect;
expect(42).not.to.be.an.cancelEffect;
expect(invalidEffect).not.to.be.an.cancelEffect;

invalidEffect.should.not.be.an.cancelEffect;
```

<a name="effects-joincanceltask-tojoincanceltask"></a>
### .to.join/cancel(task)
does not fail if tested object is `join/cancel` effect with correct task yielded from generator.

```js
function* testSaga() {
  yield join(mockTask);
  yield cancel(otherMockTask);
  // docs-ignore-start
  yield join(otherMockTask);
  yield cancel(mockTask);
  // docs-ignore-end
}

const gen = testSaga();
const first = gen.next();
const second = gen.next();

expect(first).to.join(mockTask);
expect(second).to.cancel(otherMockTask);
```

<a name="effects-joincanceltask-nottojoincanceltask"></a>
### .not.to.join/cancel(task)
does not fail if tested object is `join/cancel` effect with incorrect task.

```js
function* testSaga() {
  yield join(otherMockTask);
  yield join(mockTask);
  yield cancel(otherMockTask);
  yield cancel(mockTask);
}

const gen = testSaga();
const first = gen.next();
const second = gen.next();
const third = gen.next();
const fourth = gen.next();

expect(first).not.to.join(mockTask);
expect(second).not.to.join(otherMockTask);
expect(third).not.to.cancel(mockTask);
expect(fourth).not.to.cancel(otherMockTask);
```

<a name="effects"></a>
# Effects
<a name="effects-selectpattern"></a>
## select(pattern)
<a name="effects-selectpattern-beselecteffect"></a>
### .be.selectEffect
does not fail if tested object is `select` effect.

```js
const effect = select(noop);
expect(effect).to.be.selectEffect;
```

<a name="effects-selectpattern-notbeselecteffect"></a>
### .not.be.selectEffect
does not fail if tested object is not `select` effect.

```js
const notTakeEffectObject = put({ type: 'ACTION' });

expect(null).not.to.be.an.selectEffect;
expect(undefined).not.to.be.an.selectEffect;
expect(42).not.to.be.an.selectEffect;
expect(notTakeEffectObject).not.to.be.an.selectEffect;
```

<a name="effects-selectpattern-toselectselector"></a>
### .to.select(selector)
does not fail if tested object is `select` effect yielded from generator.

```js
function* testSaga() {
  yield select(noop);
}
const next = testSaga().next();
expect(next).to.select(noop);
// dpcs-ingore-start
expect(() => {
  expect(next).to.select(x => x);
}).to.throw(AssertionError);
```

<a name="effects-selectpattern-nottoselectselector"></a>
### .not.to.select(selector)
does not fail if tested object is `select` effect with wrong selector.

```js
const selector = state => state.prop;

function* testSaga() {
  yield select(selector);
}
const next = testSaga().next();
expect(next).not.to.select(noop);
```

<a name="effects-selectpattern-toselectselectorwithargsargs"></a>
### .to.select(selector).withArgs(...args)
does not fail if tested object is `select` effect and it was with called with correct arguments.

```js
function* testSaga() {
  yield select(noop, 1);
  yield select(noop, 1, 2);
  yield select(noop, 1, 2, 3);
}

const gen = testSaga();
const steps = [];
let next = gen.next();

while (!next.done) {
  steps.push(next);
  next = gen.next();
}

expect(steps[0]).to.select(noop).withArgs(1);
expect(steps[1]).to.select(noop).withArgs(1, 2);
expect(steps[2]).to.select(noop).withArgs(1, 2, 3);
```

<a name="effects-selectpattern-toselectselectorwithoutargsargs"></a>
### .to.select(selector).withoutArgs(..args)
does not fail if tested object is `select` effect and it was called without args.

```js
function* testSaga() {
  yield select(noop);
}

const next = testSaga().next();

expect(next).to.select(noop).withoutArgs();
```


