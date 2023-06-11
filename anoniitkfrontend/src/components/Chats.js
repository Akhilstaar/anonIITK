import React, { useState, useEffect, useRef } from "react";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [param, setParam] = useState("13515");
  const chatContainerRef = useRef(null);

  const fetchChats = () => {
    fetch("/api/user/chats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Something went wrong while loading Chats. OR maybe firewall blocked you for a while.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }
    fetch("/api/user/m3ssage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newMessage,
        key: param,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setChats((prevChats) => [...prevChats, data.success]);
          setNewMessage("");
          setSuccess("Message sent successfully.");
          setTimeout(() => {
            setSuccess("");
            scrollToBottom();
          }, 2000);
        } else {
          console.error(data.error);
          setError("Failed to send message.");
          setTimeout(() => {
            setError("");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to send message.");
        setTimeout(() => {
          setError("");
        }, 1000);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const sortedChats = chats.sort((a, b) => a.Message_id - b.Message_id);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="m-3 text-white" >
      <div style={{ marginLeft: "1rem", marginRight: "3rem" }}>
        <h3 className="mt-3">Suite... yourself & start talking</h3>
        <hr className="hr" />
      </div>

      <div
        className="rounded-4 p-2"
        style={{
          marginLeft: "1rem",
          height: "500px",
          overflowY: "auto",
        }}
        ref={chatContainerRef}
      >
        {loading ? (
          <div>Loading...</div>
        ) : error ? (

          <div className="error-message">{error}
          <p>Try refreshing the page when you are sure you aren't Spamming.</p>
          </div>
        ) : chats.length > 0 ? (
          <div style={{ overflowX: "hidden" }}>
            {sortedChats.map((chat) => (
              <div className="row px-3 py-2" key={chat.Message_id}>
                <div className="col-md-4">
                  <h4 style={{ color: "red" }}>{chat.user}</h4>
                  <p>{formatDate(chat.date)}</p>
                </div>
                <div className="col-md-8">
                  <p style={{ wordWrap: "break-word" }}>{chat.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1>No one's talking today! Say h3ll0!! to start a conversation!</h1>
        )}
      </div>
      <br />
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="container ml-1">
        <input
          className="form-control "
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default Chats;
