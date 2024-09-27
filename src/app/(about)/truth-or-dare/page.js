"use client";

import { useState } from "react";

const TruthDare = () => {
  const [ageGroup, setAgeGroup] = useState("21-30");
  const [playingWith, setPlayingWith] = useState("friends");
  const [userPrompt, setUserPrompt] = useState("");
  const [rounds, setRounds] = useState(5);
  const [gender, setGender] = useState("male & female");

  const [truths, setTruths] = useState([]);
  const [dares, setDares] = useState([]);

  const [rotation, setRotation] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [playerNames, setPlayerNames] = useState([]);
  const [rotationCount, setRotationCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [suggestion, setSuggestion] = useState("")
  const [apiError, setApiError] = useState("")
  const [apiLoading, setApiLoading] = useState(false)

  const rotateBottle = () => {
    setSuggestion("")
    if (rotationCount < rounds) {
      const randomRotation = Math.floor(Math.random() * 360) + 1080; 
      setRotation(randomRotation);
      const randomIndex = Math.floor(Math.random() * playerNames.length);
      setSelectedPlayer(playerNames[randomIndex]);
      setRotationCount(rotationCount + 1);
      setErrorMessage("");
    } else {
      setErrorMessage(`Oops...You have reached the maximum number of ${rounds} rotations!`);
    }
  };

  const addPlayerInput = () => {
    setPlayerNames([...playerNames, ""]);
  };

  const updatePlayerName = (index, value) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = value;
    setPlayerNames(newPlayerNames);
  };

  const onSubmitBtn = async () => {
    setApiLoading(true);
    if(playerNames.length > 0){
      const res = await fetch(`http://127.0.0.1:5000/api/tds/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "age_group": ageGroup,
          "gender": gender,
          "playing_with": playingWith,
          "rounds": rounds,
          "user_prompt": userPrompt,
        }),
      });
    
      if (!res.ok) {
        setApiError("Oops...some issue occurred. Please refresh the page and try again.");
        console.log("Error refreshing access token");
        setApiLoading(false);
      } else {
        const data = await res.json();
        setTruths(data[0]["truth"]);
        setDares(data[0]["dare"]);
        setApiLoading(false);
  
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth", 
        });
      }

    }
    else{
      setApiError("Oops..Please add users to start the game");
    }
  };

  const onEndClick = () =>{
    window.location.reload(false)
  }

  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
      {/* Heading and description */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#FABC3F]">
          Truth, Dare and AI Surprises
        </h1>
        <p className="text-lg sm:text-xl text-gray-100 mt-4 dark:text-white">
          Get ready to take your favorite party game to the next level with AI-powered truths and dares! Just give us a prompt, and we'll suggest fun, personalized challenges for your group.
        </p>
      </div>
      <form className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md" onSubmit={onSubmitBtn}>
        <div>
          {/* Age Group */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Age Group</label>
            <select
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              name="age_group"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              <option value="">Select Age Group</option>
              <option value="below_10">Below 10</option>
              <option value="10-20">10 - 20</option>
              <option value="21-30">21 - 30</option>
              <option value="31-40">31 - 40</option>
              <option value="41-50">41 - 50</option>
              <option value="above_50">Above 50</option>
            </select>
          </div>

          {/* Playing With */}
          <div className="col-span-1 mt-4">
            <label className="block text-gray-700 font-medium mb-2">Playing With</label>
            <select
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              name="playing_with"
              value={playingWith}
              onChange={(e) => setPlayingWith(e.target.value)}
            >
              <option value="friends">Friends</option>
              <option value="family">Family</option>
              <option value="colleagues">Colleagues</option>
              <option value="cousins">Cousins</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Gender */}
          <div className="col-span-1 mt-4">
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <select
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="male & female">Male & Female</option>
            </select>
          </div>

          {/* User Prompt */}
          <div className="col-span-2 mt-4">
            <label className="block text-gray-700 font-medium mb-2">Your Prompt</label>
            <textarea
              className="w-full h-24 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              maxLength="500"
              placeholder="Describe the vibe or group for your game (e.g., ‘fun but daring challenges for couples’ or ‘truths and dares for a wild night with friends’)."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            ></textarea>
          </div>

          {/* Rounds */}
          <div className="col-span-2 mt-4">
            <label className="block text-gray-700 font-medium mb-2">Rounds (1-20)</label>
            <input
              type="range"
              min="1"
              max="20"
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{rounds} Rounds</div>
          </div>

          {/* Player Names */}
          <div className="col-span-2 mt-4">
            <label className="block text-gray-700 font-medium mb-2">Player Names</label>

            <div className="flex flex-wrap gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-grow">
                {playerNames.map((name, index) => (
                  <input
                    key={index}
                    type="text"
                    value={name}
                    onChange={(e) => updatePlayerName(index, e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder={`Player ${index + 1} Name`}
                  />
                ))}
                <button
                  type="button"
                  onClick={addPlayerInput}
                  className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 ease-in-out h-fit self-start"
                >
                  + Add Player
                </button>
              </div>
            </div>
          </div>
        </div>

        {apiError && (
          <div className="mt-4 text-red-500 font-semibold">
            {apiError}
          </div>
        )}

        {truths.length > 0 && (
          <div className="mt-4 text-green-500 font-semibold">
            Yayyy! Game started, scroll down and have fun!
          </div>
        )}

        <div className="mt-8">
          <button
            type="button"
            onClick={truths.length > 0 ? onEndClick : onSubmitBtn}
            disabled={apiLoading}
            className={`w-full py-3 px-6 ${truths.length > 0 ? 'bg-red-500' : 'bg-[#FABC3F]'} text-white font-semibold rounded-lg hover:${truths.length > 0 ? 'bg-red-600' : 'bg-[#FCCD2A]'} transition duration-300 ease-in-out`}
          >
            {apiLoading ? "Loading..." : truths.length > 0 ? "End Game" : "Start Game"}
          </button>
        </div>
      </form>

      {/* Bottle and Rotate Button */}
      <div className="mt-16 flex flex-col items-center justify-center">
        <div className="relative">
          <img
            id="bottle"
            src="/bottle.png"
            alt="Spinning Bottle"
            className="w-32 h-72 transition-transform duration-1000 ease-out"
            style={{ transform: `rotate(${rotation}deg)` }} 
          />
        </div>

        <button
          className="mt-6 py-2 px-4 bg-[#FABC3F] text-white font-semibold rounded-lg hover:bg-[#FCCD2A] transition duration-300 ease-in-out"
          onClick={rotateBottle}
        >
          Rotate
        </button>

        <p className="text-xl mt-4">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-extrabold">
              Round No. {rotationCount}!
            </span>
          </p>

        {errorMessage && (
          <div className="mt-4 text-red-500 font-semibold">
            {errorMessage}
          </div>
        )}

        {selectedPlayer && (
          <div className="mt-6 text-2xl font-bold text-gray-700 dark:text-white">
            {selectedPlayer} was chosen!
          </div>
        )}

        {console.log("rounds", rounds)}

        {/* Truth and Dare buttons */}
        {selectedPlayer && (
          <div className="flex space-x-6 mt-6">
            <button onClick={()=>setSuggestion(truths[rotationCount-1])} className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Truth
            </button>
            <button onClick={()=>setSuggestion(dares[rotationCount-1])} className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">
              Dare
            </button>
          </div>
        )}
      </div>

      {/* Display the suggestion */}
      {suggestion && (
        <div className="mt-8 p-6 bg-yellow-100 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Suggestion:</h2>
          <p className="text-xl font-semibold text-indigo-600">
            {suggestion}
          </p>

          {/* Additional styles for more emphasis */}
          <p className="text-2xl mt-4">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-extrabold">
              Have Fun!
            </span>
          </p>

          <p className="mt-4 text-lg font-medium text-gray-700">
            Make sure to be honest if it's Truth and bold if it's a Dare!
          </p>
        </div>
      )}
    </section>
  );
};

export default TruthDare;