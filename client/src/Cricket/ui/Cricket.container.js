import { Cricket } from "./Cricket";
import { connect } from "react-redux";
import { inscrireCricket } from "../domaine/actions";
import { selectInscrits, selectPhase } from "../domaine/reducer";

const mapStateToProps = (state) => ({
  joueurs: selectInscrits(state),
  phase: selectPhase(state),
});

const mapDispatchToProps = (dispatch) => ({
  onInscription: (joueur) => dispatch(inscrireCricket(joueur)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cricket);
