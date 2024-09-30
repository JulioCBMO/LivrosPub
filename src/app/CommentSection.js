import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.js';


const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Falha ao carregar comentários. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    if (!nameRegex.test(userName)) {
      setError('Por favor, insira um nome válido (2-30 caracteres, apenas letras e espaços).');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          { user_name: userName, comment_text: commentText, rating: rating }
        ]);

      if (error) throw error;
      await fetchComments();
      setUserName('');
      setCommentText('');
      setRating(5);
    } catch (error) {
      console.error('Error inserting comment:', error);
      setError('Falha ao enviar comentário. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div id="comment-section" className="div-pessoa1">
          <input
            type="text"
            id="user-name"
            placeholder="Seu nome"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <textarea
            id="comment-input"
            placeholder="Digite seu comentário aqui"
            required
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <label htmlFor="rating">Avaliação:</label>
          <select
            id="rating"
            required
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
            <option value="0">☆☆☆☆☆ (0)</option>
          </select>
          <button className="button-login shadow" type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Comentário'}
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div>
        <h2>Comentários</h2>
        {isLoading ? (
          <p>Carregando comentários...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="div-pessoa1">
              <h3>{comment.user_name}</h3>
              <p>{comment.comment_text}</p>
              <p>Avaliação: {"★".repeat(comment.rating) + "☆".repeat(5 - comment.rating)}</p>
            </div>
          ))
        ) : (
          <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
