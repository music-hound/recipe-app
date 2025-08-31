"use client";

import { registerUser } from "@/actions/register";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { useState } from "react";

interface IProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    const result = await registerUser(formData);
    console.log("Registration result:", result);
    onClose();
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      <Input
        aria-label="Email"
        isRequired
        name="email"
        placeholder="Введите почту"
        type="email"
        value={formData.email}
        classNames={{
          innerWrapper: "bg-default-100",
          input: "text-sm focus-outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return "Почта обязательна";
          if (!validateEmail(value)) return "Некорректная почта";
          return null;
        }}
      />

      <Input
        isRequired
        name="password"
        placeholder="Введите пароль"
        type="password"
        value={formData.password}
        classNames={{
          innerWrapper: "bg-default-100",
          input: "text-sm focus-outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return "Пароль обязателен";
          if (value.length < 6) return "Пароль должен быть не менее 6 символов";
          return null;
        }}
      />

      <Input
        isRequired
        name="confirmPassword"
        placeholder="Подтвердите пароль"
        type="password"
        value={formData.confirmPassword}
        classNames={{
          innerWrapper: "bg-default-100",
          input: "text-sm focus-outline-none",
        }}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        validate={(value) => {
          if (!value) return "Пароль для подтверждения обязателен";
          if (value !== formData.password) return "Пароли не совпадают";
          return null;
        }}
      />

      <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose}>
          Отмена
        </Button>
        <Button color="primary" type="submit">
          Зарегистрироваться
        </Button>
      </div>
    </Form>
  );
};
export default RegistrationForm;
