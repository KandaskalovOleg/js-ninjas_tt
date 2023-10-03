import "./Cards.css";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { AddHeroForm } from "./AddHeroForm";
import { config } from "../../../env/env";
import { Loader } from "../Loader/Loader";

export const Cards = () => {
  const [heroesData, setHeroesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreate, setIsCreate] = useState(true);

  useEffect(() => {
    if (isCreate === true) {
      setIsLoading(true);
      fetch(`${config.apiUrl}superheroes/get-all`).then(async (response) => {
        setHeroesData(await response.json());
        setIsLoading(false);
        setIsCreate(false);
      });
    }
  }, [isCreate]);

  const handleDeleteSuperhero = async (id) => {
    setIsLoading(true);
    await fetch(`${config.apiUrl}superheroes/delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      const newHeroesData = heroesData.filter(hero => hero._id !== id);
      setHeroesData(newHeroesData);
      setIsLoading(false);
  
      if (currentHeroes.length === 1 && currentPage > 0) {
        localStorage.setItem("currentPage", currentPage - 1);
        setCurrentPage(currentPage - 1);
      }
    });
  };

  const heroesPerPage = 5;
  const offset = currentPage * heroesPerPage;
  const currentHeroes = heroesData.slice(offset, offset + heroesPerPage);
  const pageCount = Math.ceil(heroesData.length / heroesPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    localStorage.setItem("currentPage", selected);
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("body-no-scroll");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("body-no-scroll");
  };

  return (
    <div className="cardsBlock">
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <div>
            <button onClick={openModal} className="addHero">
              Add new hero
            </button>
            {isModalOpen && (
              <AddHeroForm
                closeModal={closeModal}
                isModalOpen={isModalOpen}
                setIsCreate={setIsCreate}
              />
            )}
          </div>
          <div className="cardBlockWrapper">
            {currentHeroes.map((superhero) => (
              <Card
                key={superhero._id}
                superhero={superhero}
                onDeleteClick={handleDeleteSuperhero}
              />
            ))}
          </div>
          <div className="paginateBlock">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              forcePage={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};
