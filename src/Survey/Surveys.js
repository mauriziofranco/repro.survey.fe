import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

class Surveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            questions: [],
            questionsDiv: [],
            survey: "",
            timer: ""
        };
    }

    componentDidMount() {
        const queryParameters = new URLSearchParams(window.location.search)
        const tokenId = queryParameters.get("tokenId")
        console.log(tokenId)

        fetch('http://centauri.proximainformatica.com/cerepro.hr.backend/dev/api/v1/survey/getSurveyForCandidate/' + tokenId).then(response => response.json())
            .then(responseData => {
                this.setState({
                    questions: responseData.questions,
                    survey: responseData,
                    timer: responseData.time,
                    surveyLoading: false
                })
            })
            .catch(err => console.error(err));
    }

    createSurveyreplies = () => {
        console.log("createSurveyreplies")
        const item = {
            surveyId: this.state.survey.surveyId,
            userId: this.state.survey.userId,
            userTokenId: this.state.survey.userTokenId
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        };
        fetch('http://centauri.proximainformatica.com/cerepro.hr.backend/dev/api/v1/surveyreplyrequest/start/', requestOptions)
            .then(response => response.json())
        console.log(item)
    }

    getIndexButtons() {
        console.log("getIndexButtons")
        this.setState({ indexButton: [] })
        const numSlides = document.getElementsByClassName("slide").length;
        for (let i = 0; i < numSlides; i++) {
            this.setState(prevState => ({
                indexButton: [prevState.indexButton, <Button onClick={() => this.handleSelectedSlide(i)}>{i + 1}</Button>]
            }))
        }
    }

    getButtons() {
        console.log("getIndexButtons")
        const button = []
        const numSlides = document.getElementsByClassName("slide").length;
        for (let i = 0; i < numSlides; i++) {
            button.push(<Button onClick={() => this.handleSelectedSlide(i)}>{i + 1}</Button>)
        }
        return button;
    }

    handleNextSlide = () => {
        console.log("handleNextSlide")
        const numSlides = document.getElementsByClassName("slide").length;
        if (this.state.currentSlide !== numSlides - 1) {
            const nextSlide = this.state.currentSlide + 1;
            document.getElementsByClassName("slide")[this.state.currentSlide].style.display = "none";
            document.getElementsByClassName("slide")[nextSlide].style.display = "block";
            this.setState({ currentSlide: nextSlide });
        }
    };

    handlePrevSlide = () => {
        console.log("handlePrevSlide")
        if (this.state.currentSlide !== 0) {
            const prevSlide = this.state.currentSlide - 1;
            document.getElementsByClassName("slide")[this.state.currentSlide].style.display = "none";
            document.getElementsByClassName("slide")[prevSlide].style.display = "block";
            this.setState({ currentSlide: prevSlide });
        }
    };

    handleSelectedSlide = index => {
        console.log("handleSelectedSlide " + index)
        document.getElementsByClassName("slide")[this.state.currentSlide].style.display = "none";
        document.getElementsByClassName("slide")[index].style.display = "block";
        this.setState({ currentSlide: index });
    };

    startSurvey = () => {
        console.log("startSurvey")
        document.getElementsByClassName("start")[0].style.display = "none";
        document.getElementsByClassName("movementButtons")[0].style.display = "block";
        document.getElementsByClassName("slide")[0].style.display = "block";
    };

    render() {
        const list = this.state.questions.map((element, i) => {
            return (

                <div className="slide" style={{ display: "none" }}>
                    <p>Question: {i+1}</p>
                    <div>
                        <h4>{element.label}</h4>
                    </div>
                    <div>
                        <span><input type="checkbox" /></span>
                        <span>{element.ansa}</span>
                    </div>
                    <div>
                        <span><input type="checkbox" /></span>
                        <span>{element.ansb}</span>
                    </div>
                    <div>
                        <span><input type="checkbox" /></span>
                        <span>{element.ansc}</span>
                    </div>
                    <div>
                        <span><input type="checkbox" /></span>
                        <span>{element.ansd}</span>
                    </div>
                    <div>
                        <span><input type="checkbox" /></span>
                        <span>{element.anse}</span>
                    </div>
                    <div >
                        <span><input type="checkbox" /></span>
                        <span>{element.ansf}</span>
                    </div>
                    <div >
                        <span><input type="checkbox" /></span>
                        <span>{element.ansg}</span>
                    </div>
                    <div >
                        <span><input type="checkbox" /></span>
                        <span>{element.ansh}</span>
                    </div>
                </div>
            )
        },
        )
        return (
            <div align="center">
                <div id="start" class="start">
                    <h1>Corso Full Stack Developer.</h1>
                    <h2>Questionario d'ingresso.</h2>
                    <br />
                    <p>
                        Gentile candidato, questa è la pagina di presentazione del questionario d'ingresso utile per la partecipazione al prossimo
                        corso Full Stack Developer in partenza.
                        <br /> La preghiamo di compilare il questionario in base alle sue attuali conoscenze. Questo
                        ci permetterà di avere idea delle sue attuali competenze, e poter quindi, organizzare al meglio il corso stesso.
                    </p>
                    <p>
                        Attenzione, il questionario va terminato entro il tempo massimo che vedrà in alto a sinistra, una volta iniziata la compilazione.
                        <br />Clicchi sul link qui in basso solo quando effettivamente vorrà compilare il questionario.
                        <br />Avrà solo una possibilità di compilare il questionario.
                    </p>
                    <br />
                    <Button id="startSurvey" onClick={() => { this.startSurvey(); this.createSurveyreplies() }}>Inizia il questionario</Button>
                </div>
                {list}
                <ButtonToolbar className="movementButtons" style={{ display: "none" }}>
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Button onClick={this.handlePrevSlide}>Indietro</Button>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        {this.getButtons()}
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={this.handleNextSlide}>Avanti</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        )

    }
}
export default Surveys;
