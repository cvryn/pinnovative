import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BoardItems from "./BoardItems";
import catloading from "../../../public/cat-what.gif";
import { fetchBoards, deleteBoard } from "../../router/boardLoader";

import "./ManageBoards.css";

const ManageBoards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector((state) => state.session.user);

  const fetchBoardsData = async () => {
    try {
      const data = await fetchBoards();
      setBoards(data);
    } catch (error) {
      console.error("Failed to fetch boards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardsData();
  }, []);

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId);
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== boardId)
      );
    } catch (error) {
      console.error("Failed to delete board:", error);
    }
  };

  const handleEditBoard = (updatedBoard) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === updatedBoard.id ? { ...board, ...updatedBoard } : board
      )
    );
  };

  const currentUserBoards = boards.filter(
    (board) => board.user_id === currentUser.id
  );

  if (loading) {
    return (
      <div
        id="loading-screen"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="loader">Loading pins right meow...</div>
        <div>
          <img src={catloading} alt="Loading" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <h1>ʕง•ᴥ•ʔง</h1> */}
      <div id='manage-boards-container'>
      <h1> Manage My Boards</h1>
      {currentUserBoards.length > 0 ? (
        <BoardItems
          boards={currentUserBoards}
          onEdit={handleEditBoard}
          onDelete={handleDeleteBoard}
        />
      ) : (
        <div>
          <p>No boards available.</p>
          <Link to="/boards/new">
            <div className="no-boards-container">Create A New Board</div>
          </Link>
        </div>
      )}

      </div>
    </>
  );
};

export default ManageBoards;
