import axios from "axios";

const API_URL = "/api/tickets/";

//Get note for single tickets
const getSingleNote = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + ticketId + "/notes", config);

  return response.data;
};

//Create note for single tickets
const createSingleNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + ticketId + "/notes",
    { text: noteText },
    config
  );

  return response.data;
};

const noteService = { getSingleNote, createSingleNote };

export default noteService;
