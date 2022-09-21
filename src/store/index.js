import Vue from "vue";
import Vuex from "vuex";
import UserStore from "./UserStore";
import AssignmentStore from "./AssignmentStore";
import MeetingStore from "./MeetingStore";
import ClassStore from "./ClassStore";
import ExamStore from "./ExamStore";
import NoteStore from "./NoteStore";
import PaymentStore from "./PaymentStore";
import OrganizationStore from "./OrganizationStore";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user: UserStore,
    meetings: MeetingStore,
    assignments: AssignmentStore,
    classes: ClassStore,
    notes: NoteStore,
    exams: ExamStore,
    payment: PaymentStore,
    organization: OrganizationStore,
  },
});
