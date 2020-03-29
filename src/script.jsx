import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import classnames from 'classnames';

const questionNames = [
    "Help us design a space station!",
    "What is the best option for air in a space station?",
    "Water is expensive to carry in space. How much water should we take (per astronaut)?",
    "We'll need food in space. Which of these diets should we choose?",
    "How should we deal with human waste?",
    "How should we power our space station?",
    "Eventually, we'll run out of water. How should we produce more?",
    "What should we do with the solid waste?",
    "We need to stay fit while we're in space. Which equipment is the best choice?",
    "The air in our storage tanks won't last forever. How will we keep the air fresh?",
    "Plants should work, but how many do we need?",
    "How will we produce food?",
    "Great! We can re-use the same plants, but we'll need to redo some calculations. How many do we need now?",
    "Okay; what types of crops should we grow?"
];

const options = [
    [],
    [
        { n: 'O<sub>2</sub>', d: 'Oxygen is the only gas humans need to breathe, but pure oxygen is highly flammable.' },
        { n: 'O<sub>2</sub> &amp; N<sub>2</sub>', c: true, d: 'Nitrogen and oxygen are the two gases that are most prevalant in the earth\'s air.' },
        { n: 'CO<sub>2</sub>', d: "CO<sub>2</sub> is what humans breathe out." }
    ],
    [
        { n: '1 cup', i: 'sprites/watercup.svg', d: '1 cup of water isn\'t heavy, but also isn\'t enough for an astronaut.' },
        { n: '2 quarts', c: true, i: 'sprites/waterquarts.svg', d: '2 quarts is more water than you\'d use on earth, but you\'ll want it in space.' },
        { n: '1 gallon', i: 'sprites/watergallon.svg', d: 'This would be good for outdoor activities, but you probably don\'t need this much water for space.' },
        { n: '10 gallons<br/>(freeze-dried)', i: 'sprites/waterfreezedried.svg', d: 'Think about the logic behind freeze-<b>dried</b> water.' }
    ],
    [
        { n: 'Chicken, milk, fruit, and candy', i: 'sprites/healthydiet.svg', c: true, d: 'A well balanced diet!'},
        { n: 'Fruit and veggie salad', i: 'sprites/fruitdiet.svg', d: 'A bit more variety would be good.' },
        { n: 'Fast food', i: 'sprites/fastfood.svg', d: 'This might last a long time, but we sure won\'t if that\'s all we eat.' }
    ],
    [
        { n: 'Vacuum toilet', i: 'sprites/toilet.svg', c: true, d: 'This is the most effective way of storing waste and keeping things clean.' },
        { n: 'Hold it', i: 'sprites/holdit.svg', d: 'You can\'t hold it for months.' }
    ],
    [
        { n: 'Batteries', i: 'sprites/batteries.svg', d: 'It would cost far too much to use batteries as the main power source in space, though they could serve as a decent backup option.'},
        { n: 'Nuclear power', i: 'sprites/nuclear.svg', d: 'Running an effective nuclear generation plant in space would be expensive and dangerous.' },
        { n: 'Solar panel', i: 'sprites/solar.svg', d: 'Devices in space get very direct sunlight, so this is a very effective option.', c: true }
    ],
    [
        { n: 'Recycle urine', i: 'sprites/recycling.svg', d: 'It sounds disgusting, but this is how they do it in real life.', c: true},
        { n: 'Catch a comet', i: 'sprites/comet.svg', d: 'There\'s lots of frozen water in comets, but it\'s extremely difficult to capture one.' },
        { n: 'Mix hydrogen and oxygen', i: 'sprites/atom.svg', d: 'Hydrogen and oxygen weigh too much for this to be effective.' }
    ],
    [ 
        { n: "Store it", i: 'sprites/box.svg', d: 'This sounds boring, but it\'s the best way to do things.', c: true },
        { n: "Dump it into space", i: 'sprites/wastedump.svg', d: 'This could pose a danger to future spacecraft.' },
        { n: "Burn it", i: 'sprites/fire.svg', d: 'The technology for burning solid waste isn\'t ready yet.' }
    ],
    [
        { n: "Racquetball", i: "sprites/racquet.svg", d: "The lack of gravity will make playing this somewhat difficult." },
        { n: "Weightlifting", i: "sprites/weightlifting.svg", d: "Lifting weights requires gravity." },
        { n: "Stationary bike", i: "sprites/stationarybike.svg", d: "This will provide adequate exercise.", c: true}
    ],
    [
        { n: "Sponge bath", i: "sprites/sponge.svg", d: "This lets you clean off without too much water everywhere.", c: true},
        { n: "Sonic shower", i: "sprites/shower.svg", d: "Is this even a thing?" },
        { n: "Shower with mask", i: "sprites/googles.svg", d: "A mask keeps the water from going in your eyes, but the water still won't flow on you."}
    ],
    [
        { n: "Scrub CO<sub>2</sub> from the air", i: "sprites/air-filter.svg", d: "This only removes CO<sub>2</sub> from the air. It doesn't create more oxygen." },
        { n: "Mine asteroids for O<sub>2</sub>", i: "sprites/asteroid.svg", d: "This would be very expensive and inefficient." },
        { n: "Recycle O<sub>2</sub> with plants", i: "sprites/plant.svg", d: "Great idea! Plants naturally convert carbon dioxide into oxygen.", c: true }
    ],
    [
        { n: "2 square meters", d: "That won't be enough for one astronaut." },
        { n: "6 square meters", d: "That'll barely be enough for one astronaut."},
        { n: "10 square meters", d: "Good answer! It takes 10 square meters of plants just to recycle enough oxygen for a single astronaut!", c: true},
    ],
    [
        { n: "Hydroponic garden", d: "That's right! A hydroponic garden can be grown in water instead of soil and will provide sufficient food.", c: true, i: "sprites/plant.svg" },
        { n: "Use a replicator", d: "This doesn't exist. Didn't the lack of a picture concern you?" },
        { n: "Raise livestock", i: "sprites/cow.svg", d: "Raising livestock in space won't work very well. "}
    ],
    [
        { n: "10 square meters", d: "That's enough for oxygen recycling, but not food production." },
        { n: "50 square meters", d: "That should be enough.", c: true },
        { n: "100 square meters", d: "This will be an excessive number of plants. We don't have that much space."}
    ],
    [
        { n: "Tomatoes, soybeans, wheat, and potatoes", c: true, d: "A very well-balanced choice." },
        { n: "Tobacco, wheat, radishes, and avocadoes", d: "We can't be smoking in space! And did you know that avocadoes grow on trees (and thus take up a lot of space)?"},
        { n: "Soybeans, radishes, and tomatoes", d: "See if you can get a bit more variety in to the menu." }
    ]
];

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
options.forEach(array => shuffle(array));

window.onload = function() {
    function App() {
        const [ currentState, setCurrentState ] = React.useState(0);
        const [ inTransition, setTransition ] = React.useState(false);
        const [ optionFocused, setOptionFocused ] = React.useState(null);
        const [ beforeTransitionInCb, setBeforeTransitionInCb ] = React.useState({ fn: null });
        const advanceState = () => {
            let shouldMoveForward = true;
            if(optionFocused && !optionFocused.c)
                shouldMoveForward = false;
            setBeforeTransitionInCb({ fn: () => {
                setOptionFocused(null);
                if(shouldMoveForward)
                    setCurrentState(currentState+1);
            }});
            setTransition(true);
        };
        

        React.useEffect(() => {
            if(inTransition) {
                let id = setTimeout(() => {
                    if(beforeTransitionInCb.fn) {
                        beforeTransitionInCb.fn();
                        setBeforeTransitionInCb({ fn: null });
                    }
                    setTransition(false);
                    id = null;
                }, 1000);
                return function() { if(id != null) clearTimeout(id); };
            } else
                return undefined;
        }, [ inTransition ]);

        let currentInstructions = null, currentOptions = null;
        const transitionClass = inTransition ? 'hide-transition' : null;
        const isEndGame = (currentState >= questionNames.length);
        const chooseOption = (optionIndex) => {
            const option = options[currentState][optionIndex];
            setBeforeTransitionInCb({ fn: () => setOptionFocused(option) });
            setTransition(true);
        };

        if(optionFocused)
            currentInstructions = optionFocused.c ? "Yes!" : "Not quite...";
        else if(!isEndGame)
            currentInstructions = questionNames[currentState];
        else
            currentInstructions = "Congratulations! You successfully built a sustainable space station!";
        
        if(currentState == 0 || optionFocused)
            currentOptions = <button className="swal2-confirm swal2-styled start-button" onClick={advanceState} disabled={inTransition}>{optionFocused ? "Continue" : "Start"}</button>;
        else if(!isEndGame)
            currentOptions = options[currentState].map((option, index) => <button key={option.n} className="swal2-confirm swal2-styled start-button" onClick={chooseOption.bind(void 0, index)} disabled={inTransition}>
                {option.i && <img src={option.i} className="option-image"/>}
                <span dangerouslySetInnerHTML={{__html: option.n }}></span>
            </button>);
        return <div className={classnames('space-station', transitionClass)}>
            <div className={classnames('instructions-container', transitionClass)}>
                <span className={'instructions'}>{currentInstructions}</span>
                <span className={'instructions option-description'} dangerouslySetInnerHTML={optionFocused && { __html: optionFocused.d}}></span>
            </div>
            {(isEndGame&&!inTransition) && <img src="sprites/spacestation.svg" className="space-station-completed"/>}
            <div className={classnames('space-station-options', transitionClass)}>
                {currentOptions}
            </div>
        </div>;
    }
    ReactDOM.render(<App/>, document.getElementById("game-container"));
}