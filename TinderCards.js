import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import database from "./firebase";
import { collection, onSnapshot } from 'firebase/firestore';

function TinderCards() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'outfits'), (snapshot) => {
      setPeople(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const onSwipe = (direction, personToRemove) => {
    if (direction === 'left' || direction === 'right') {
      setPeople((prevPeople) => prevPeople.filter(person => person.id !== personToRemove.id));
    }
  };

  return (
    <div className="tinderCards__container">
      <h1>Fit Finder</h1>
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.id}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => onSwipe(dir, person)}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;