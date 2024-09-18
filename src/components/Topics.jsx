

export const Topics = ({ topics, processTopicNewPost }) => {


const handleTopicChange = (event) => {
    const selectedTopicId = event.target.value; //the event itself is the ID THIS IS IMPORTANT NOT WHOLE OBJECT
    console.log("Selected topic ID from event:", selectedTopicId);
    const ourTopic = topics.find(indTopic => parseInt(indTopic.id) === parseInt(selectedTopicId));

      // Log what was found by the 'find' method
      if (ourTopic) {
        console.log("Found topic object:", ourTopic);
    } else {
        console.error("No topic found with the selected ID:", selectedTopicId);
    }

   setTimeout(() => processTopicNewPost(ourTopic), 0);
}

  return (
    <div className="topic-container">
      <label htmlFor="topic-select"> Select a Topic: </label>
      <select 
      id="topic-select"
      onChange={handleTopicChange}
      >
        {topics.map((topic) => {
            return (
                <option key={topic.id} value={topic.id}>
                Topic name: {topic.name}
                </option>
            )
        })

        }

    </select>
    </div>
  )
};