import React, { useState, useEffect } from "react";
import { createCanvas } from "canvas";

const MathCaptcha = () => {
  const [captchaImage, setCaptchaImage] = useState(null);
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");

  // Generate random numbers and operation
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10); // First number
    const num2 = Math.floor(Math.random() * 10); // Second number
    const operations = ["+", "-", "*"];
    const operation = operations[Math.floor(Math.random() * operations.length)]; // Random operation
    let answer;

    switch (operation) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      default:
        answer = 0;
    }

    setCaptchaAnswer(answer);
    return { num1, num2, operation };
  };

  // Create captcha image
  const createCaptchaImage = ({ num1, num2, operation }) => {
    const canvas = createCanvas(200, 70);
    const ctx = canvas.getContext("2d");
    // Background
    ctx.fillStyle = "#f3f3f3";
    ctx.fillRect(0, 0, 200, 70);

    // Captcha text
    ctx.font = "30px bold Arial";
    ctx.fillStyle = "#333";
    ctx.fillText(`${num1} ${operation} ${num2} = ?`, 40, 45);

    // Add noise (random lines)
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * 200, Math.random() * 70);
      ctx.lineTo(Math.random() * 200, Math.random() * 70);
      ctx.stroke();
    }

    // Add noise (random dots)
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      ctx.beginPath();
      ctx.arc(Math.random() * 200, Math.random() * 70, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Convert canvas to URL
    const dataURL = canvas.toDataURL();
    return dataURL;
  };

  // When the page loads or captcha is refreshed
  useEffect(() => {
    const captcha = generateCaptcha();
    const image = createCaptchaImage(captcha);
    setCaptchaImage(image);
  }, []);

  // Validate user's answer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer, 10) === captchaAnswer) {
      alert("Correct answer!");
    } else {
      alert("Incorrect answer. Please try again.");
    }
  };

  // Refresh the captcha
  const refreshCaptcha = () => {
    const captcha = generateCaptcha();
    const image = createCaptchaImage(captcha);
    setCaptchaImage(image);
    setUserAnswer("");
  };

  return (
    <section className="">
      {captchaImage && <img src={captchaImage} alt="captcha" className=""/>}
      <form onSubmit={handleSubmit} className="">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
          required
          className="p-[3px] text-base border rounded-md w-[200px] text-right mt-4"
        />
        <section className="flex justify-between items-center mt-4">
          <button
            onClick={refreshCaptcha}
            className="py-1 px-2 bg-orange-300 rounded-md font-semibold "
          >
            Refresh
          </button>
          <button type="submit" className="py-1 px-2 bg-lime-600 rounded-md font-semibold">
            Submit
          </button>
        </section>
      </form>
    </section>
  );
};

export default MathCaptcha;
