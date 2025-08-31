"use client";

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useIngredientStore } from "@/store/ingredient.store";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";
import { useState, useTransition } from "react";

const initialFormData = {
  name: "",
  category: "",
  unit: "",
  pricePerUnit: null as number | null,
  description: "",
};

const IngredientForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const { addIngredient } = useIngredientStore();

  const [ isPending, startTransition ] = useTransition();

  const handleSubmit = async (formData: FormData) => {

    startTransition( async () => {
    await addIngredient(formData);
    const storeError = useIngredientStore.getState().error;

    if (storeError) {
      setError(storeError);
    } else {
      setError(null);
      setFormData(initialFormData);
    }
  });
  };

  return (
    <Form action={handleSubmit} className="w-full">
      {error && (
        <p className="mb-4 text-red-500">
          {error}
        </p>
      )}
      <Input
        isRequired
        name="name"
        label="Название"
        placeholder="Введите название ингредиента"
        type="text"
        value={formData.name}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        validate={(value) => {
          if (!value) return "Название обязательно";
          return null;
        }}
      />
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Select
            isRequired
            name="category"
            label="Категория"
            placeholder="Категория"
            selectedKeys={formData.category ? [formData.category] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
            }}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Select
            isRequired
            name="unit"
            label="Ед"
            placeholder="изм"
            selectedKeys={formData.unit ? [formData.unit] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
            }}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Input
            isRequired
            name="pricePerUnit"
            placeholder="Цена"
            label="Цена"
            type="number"
            value={
              formData.pricePerUnit !== null
                ? formData.pricePerUnit.toString()
                : ""
            }
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm focus:outline-none",
            }}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : null;
              setFormData({ ...formData, pricePerUnit: value });
            }}
            endContent={
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-default-500 pointer-events-none">
                ₽
              </span>
            }
            validate={(value) => {
              if (!value) return "Цена обязательна";
              const num = parseFloat(value);
              if (isNaN(num) || num < 0) return "Введите корректную цену";
              return null;
            }}
          />
        </div>
      </div>
      <Input
        name="description"
        placeholder="Введите описание (необязательно)"
        type="text"
        label="Описание"
        value={formData.description}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <div className="flex w-full items-center justify-end">
        <Button
          color="primary"
          type="submit"
          isLoading={isPending}
          // className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Добавить ингредиент
        </Button>
      </div>
    </Form>
  );
};

export default IngredientForm;
