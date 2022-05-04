import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleUserTicket,
  closeUserTicket,
} from "../features/tickets/ticketSlice";
import { getNotes, reset as notesReset } from "../features/notes/noteSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Ticket = () => {
  const { isLoading, isSuccess, ticket, isError, message } = useSelector(
    (state) => state.ticket
  );

  const { isLoading: notesIsLoading, notes } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch();

  const { ticketId } = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getSingleUserTicket(ticketId));
    dispatch(getNotes(ticketId));
    //eslint-disable-next-line
  }, [isError, message, ticketId]);

  //close ticket
  const onTicketClose = () => {
    dispatch(closeUserTicket(ticketId));
    toast.success("Ticket Closed");
    Navigate("/tickets");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket Id: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted :{new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== "closed" && (
        <button
          onClick={onTicketClose}
          className="btn
          btn-block
          btn-danger"
        >
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
