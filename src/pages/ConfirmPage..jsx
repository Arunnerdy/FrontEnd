// src/pages/ConfirmPage.jsx
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function ConfirmPage() {
  const { projectId } = useParams();

  useEffect(() => {
    const confirm = async () => {
      try {
        await axios.put(`http://localhost:8080/api/projects/confirm/${projectId}`);
        alert("You are now confirmed. You can log in.");
      } catch (err) {
        alert("Confirmation failed");
      }
    };
    confirm();
  }, [projectId]);

  return <div className="container text-center mt-5">Confirming your access...</div>;
}
