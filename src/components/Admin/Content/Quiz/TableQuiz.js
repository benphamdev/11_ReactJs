import {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import {toast} from "react-toastify";
import {retrieveAllQuiz} from "../../../../services/api/QuizService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalQuiz from "./ModalQuiz";

const TableQuiz = (props) => {

    // const handlePageClick = (event) => {
    //     console.log(`User requested page number ${event.selected}`);
    //     setCurrentPage(event.selected + 1);
    //     fetchUsersWithPagination(event.selected + 1);
    // };

    const [quizzes, setQuizzes] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [show, setShow] = useState(false);
    const [isView, setIsView] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [quizDelete, setQuizDelete] = useState(null);

    // if (_.isEmpty(quizzes)) return;

    useEffect(() => {
        getAllQuiz();
    }, [props.isAdd]);

    const getAllQuiz = async () => {
        let response = await retrieveAllQuiz();
        if (response && response.EC === 0) {
            setQuizzes(response.DT);
        } else {
            console.log(response);
            toast.error(response.EM);
        }
    }

    const showQuiz = (quiz) => {
        setQuiz(quiz)
        setShow(true);
    }

    const handleBtnUpdate = (quiz) => {
        showQuiz(quiz)
    }

    const handleBtnView = (quiz) => {
        showQuiz(quiz);
        setIsView(true);
    }

    const handelBtnDelete = (quiz) => {
        setIsDelete(true);
        setQuizDelete(quiz);
    }

    // console.log("render TableQuiz", quiz);
    return (
        <>
            <div>List quizzes</div>
            <Table striped bordered hover size="sm" className={"mt-4"}>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Difficulty</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {
                    quizzes && quizzes.length !== 0 && quizzes.map((quiz, index) => {
                        return (
                            <tr key={index}>
                                <td className={"col-1"}>{quiz.id}</td>
                                <td className={"col-2"}>{quiz.name}</td>
                                <td className={"col-2"}>{quiz.description}</td>
                                <td className={"col-1"}>{quiz.difficulty}</td>
                                <td className={"col-3"}>

                                    <button className={"btn btn-secondary"} onClick={() => {
                                        handleBtnView(quiz)
                                    }}>
                                        View
                                    </button>

                                    <button className={"btn btn-warning mx-3"} onClick={() => {
                                        handleBtnUpdate(quiz)
                                    }}>
                                        Update
                                    </button>

                                    <button className={"btn btn-danger"} onClick={() => {
                                        handelBtnDelete(quiz)
                                    }}>
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        )
                    })
                }
                {
                    quizzes && quizzes.length === 0 && <tr>
                        <td colSpan={4}>No data</td>
                    </tr>
                }

                </tbody>
            </Table>

            <ModalQuiz
                show={show} setShow={setShow}
                getAllQuiz={getAllQuiz}
                quiz={quiz} setQuiz={setQuiz}
                isView={isView} setIsView={setIsView}
            />

            <ModalDeleteQuiz
                show={isDelete} setShow={setIsDelete}
                getAllQuiz={getAllQuiz}
                quiz={quizDelete} setQuiz={setQuizDelete}
            />

            {/*<ReactPaginate*/}
            {/*    nextLabel="next >"*/}
            {/*    onPageChange={handlePageClick}*/}
            {/*    pageRangeDisplayed={3}*/}
            {/*    marginPagesDisplayed={2}*/}
            {/*    pageCount={pageCount}*/}
            {/*    previousLabel="< previous"*/}
            {/*    pageClassName="page-item"*/}
            {/*    pageLinkClassName="page-link"*/}
            {/*    previousClassName="page-item"*/}
            {/*    previousLinkClassName="page-link"*/}
            {/*    nextClassName="page-item"*/}
            {/*    nextLinkClassName="page-link"*/}
            {/*    breakLabel="..."*/}
            {/*    breakClassName="page-item"*/}
            {/*    breakLinkClassName="page-link"*/}
            {/*    containerClassName="pagination d-flex justify-content-center"*/}
            {/*    activeClassName="active"*/}
            {/*    renderOnZeroPageCount={null}*/}
            {/*    forcePage={currentPage - 1}*/}
            {/*/>*/}
        </>
    );
}

export default TableQuiz;