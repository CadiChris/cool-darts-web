import { Cricket } from "./Cricket";
import { connect } from "react-redux";
import { inscrireCricket } from "./reducer";

const mapStateToProps = (state) => ({
  joueurs: state.joueurs,
});

const mapDispatchToProps = (dispatch) => ({
  onInscription: (joueur) => dispatch(inscrireCricket(joueur)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cricket);
