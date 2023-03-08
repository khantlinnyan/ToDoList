import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import {AiTwotoneDelete} from "@react-icons/all-files/ai/AiTwotoneDelete";
import supabase from "../config/supabaseClient";


export const SmoothieCard = ({ smoothie, onDelete }) => {

  const deleteHandler = async () => {
    const {data, error} = await supabase
    .from('smoothies')
    .delete()
    .eq('id', smoothie.id)
    .select()

    if(error) {
      console.log(error)
    }
    if(data) {
      console.log(data)
      onDelete(smoothie.id)
    }
  }
  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <i><FiEdit /></i>
        </Link>
        <i onClick={deleteHandler}><AiTwotoneDelete/></i>
      </div>
    </div>
  );
};
