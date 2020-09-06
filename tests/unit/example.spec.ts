import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import Vuex from "vuex";
import HelloWorld from "@/components/HelloWorld.vue";
import MovieList from "@/components/MovieList.vue";

// rewiewQuestion1: for testing such a component I should include vuex store and router.
//  Is it fine? I feel like including it wrong, feel like unit testing should be easier then that
const localVue = createLocalVue();
localVue.use(Vuex);

// Just a example ignore it
describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("MovieList.vue", () => {
  let store: any;
  let getters: any;

  beforeEach(() => {
    getters = {
      getUserName: () => "Some name",
      getApiToken: () => "273b9080",
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it("renders loadMore button", async () => {
    const wrapper = shallowMount(MovieList, {
      store,
      localVue,
      stubs: ["router-link"],
    });
    await wrapper.setData({
      totalResults: 5,
      movies: [{}, {}, {}],
      filterType: "",
    });
    // rewiewQuestion2: how to target classes in jest? it is not a good test in case we will have more then one possible button in component.
    expect(wrapper.html()).toContain("button");
  });

  // rewiewQuestion3:Why this one is not working? 
  // And is it good to have a similar test but with differet result? 
  // uncoment below code to see  whats wrong
  
  // it("Doesnt render loadMore button", async () => {
  //   const wrapper = shallowMount(MovieList, {
  //     store,
  //     localVue,
  //     stubs: ["router-link"],
  //   });
  //   await wrapper.setData({
  //     totalResults: 3,
  //     movies: [{}, {}, {}],
  //     filterType: "",
  //   });

  //   expect(wrapper.html()).toContain("button");
  // });
});
