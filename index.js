window.onload = function () {
    const body = document.body;
    const originalOrder = Array.from(body.children);
    const isAnimating = false;

    const moveToTop = (div) => {
        if (isAnimating) {
            return;
        }
        const divIndex = originalOrder.indexOf(div);

        gsap.fromTo(
            div,
            { opacity: 0, y: 0, scale: 1.5, rotation: -145 },
            {
                duration: 0.3,
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                backgroundColor: "#ec8bb0",
                onComplete: () => {
                    body.insertBefore(div, originalOrder[divIndex]);
                },
            }
        );
    };

    const handleClick = (event) => {
        if (isAnimating) {
            return;
        }
        const div = event.target;
        const divIndex = originalOrder.indexOf(div);

        gsap.fromTo(
            div,
            { opacity: 0, y: 0, scale: 0.1, rotation: 145 },
            {
                duration: 0.3,
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                backgroundColor: "#ece68b",
                onComplete: () => {
                    // Find the next closest non-clicked sibling
                    let nextSiblingIndex = divIndex + 1;
                    while (nextSiblingIndex < originalOrder.length) {
                        const nextSibling = originalOrder[nextSiblingIndex];
                        if (!nextSibling.classList.contains("clicked")) {
                            body.insertBefore(div, nextSibling);
                            break;
                        }
                        nextSiblingIndex++;
                    }

                    isAnimating = false;
                },
            }
        );
    };

    // Create 100 div elements and add a click event handler
    for (let i = 1; i <= 100; i++) {
        const div = document.createElement("div");
        div.textContent = `div${i}`;
        div.id = `div${i}`;
        div.addEventListener("click", handleClick);
        body.appendChild(div);
    }
};

const findNextNonClickedSibling = (div) => {
    // Find the next sibling that is not in clickedDiv's
    let sibling = div.nextElementSibling;
    while (sibling) {
        if (!clickedDivs[sibling.id]) {
            return sibling;
        }
        sibling = sibling.nextElementSibling;
    }
    return null; // If all siblings are clicked, return null
};

// onComplete: () => {
//     // Store the current position in clickedDivs
//     clickedDivs[div.id] = {
//         nextSibling: findNextNonClickedSibling(div),
//     };
//     body.prepend(div);
//     isAnimating = false;
//     div.addEventListener("click", handleClick);
//     console.log(
//         "Trigger function MoveTO TOP: ",
//         clickedDivs
//     );
// },

// onComplete: () => {
//     // Reorder the divs based on the next non-clicked sibling
//     const nextSibling =
//         clickedDivs[div.id].nextSibling;
//     if (nextSibling) {
//         body.insertBefore(div, nextSibling);
//     } else {
//         // If all siblings are clicked, move to the end
//         body.appendChild(div);
//     }
//     delete clickedDivs[div.id];

//     isAnimating = false;
//     div.addEventListener("click", handleClick);
//     console.log(
//         "Trigger Handle Click Function: ",
//         clickedDivs
//     );
// },

// for (let i = 1; i <= 100; i++) {
//     const div = document.createElement("div");
//     div.classList.add("div");
//     div.textContent = `div${i}`;
//     div.id = `div${i}`;
//     div.addEventListener("click", handleClick);
//     container.appendChild(div);
//     originalOrder.push(div);
// }

// console.log("CLICKED");
// const i =
//     findClosestNotClickedPosition(div);
// console.log(i);

// // console.log("NOT CLICKED");
// originalPositions[
//     div.id
// ].parent.insertBefore(
//     div,
//     originalPositions[div.id].nextSibling
// );
// delete originalPositions[div.id];

// isAnimating = false;
// div.addEventListener("click", handleClick);
// div.classList.remove(clickedClass);
// const r = divData.find(
//     (data) => data.id === div.id
// );
// if (r) {
//     r.class = "";
// }
