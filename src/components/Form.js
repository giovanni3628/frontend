import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getCursos, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const cursos = ref.current;
        
              cursos.nomeCursos.value = onEdit.nomeCursos;
              cursos.professorResp.value = onEdit.professorResp;
              cursos.categoria.value = onEdit.categoria;
              cursos.descricao.value = onEdit.descricao;
              cursos.imagem.value = onEdit.imagem;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cursos = ref.current;

    if (
                !cursos.nomeCursos.value ||
                !cursos.professorResp.value ||
                !cursos.categoria.value ||
                !cursos.descricao.value ||
                !cursos.imagem.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.idcursos, {
                    nomeCursos: cursos.nomeCursos.value,
                    professorResp: cursos.professorResp.value,
                    categoria: cursos.categoria.value,
                    descricao: cursos.descricao.value,
                    imagem: cursos.imagem.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
                    nomeCursos: cursos.nomeCursos.value,
                    professorResp: cursos.professorResp.value,
                    categoria: cursos.categoria.value,
                    descricao: cursos.descricao.value,
                    imagem: cursos.imagem.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

              cursos.nomeCursos.value = "";
              cursos.professorResp.value = "";
              cursos.categoria.value = "";
              cursos.descricao.value = "";
              cursos.imagem.value = "";


    setOnEdit(null);
    getCursos();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome do curso</Label>
                <Input name="nomeCursos" />
            </InputArea>
            <InputArea>
                <Label>Nome do Professor</Label>
                <Input name="professorResp" />
            </InputArea>
            <InputArea>
                <Label>Categoria</Label>
                <Input name="categoria" />
            </InputArea>
            <InputArea>
                <Label>Descrição</Label>
                <Input name="descricao" />
            </InputArea>
            <InputArea>
                <Label>Imagem</Label>
                <Input name="imagem" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
  );
};

export default Form;