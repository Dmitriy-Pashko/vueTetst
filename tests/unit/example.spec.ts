import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import Vuex from "vuex";
import HelloWorld from "@/components/HelloWorld.vue";
import MovieList from "@/components/MovieList.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("MovieListItem.vue", () => {
  let store: any;
  let getters: any;

  beforeEach(() => {
    getters = {
      getUserName: () => "Some name",
      getApiToken: () => "11111"
    };

    store = new Vuex.Store({
      getters
    });
  });

  it("renders loadMore button", async () => {
    const wrapper = shallowMount(MovieList, {
      store,
      localVue,
      stubs: ["router-link"]
    });
    await wrapper.setData({
      totalResults: 5,
      movies: [{}, {}, {}],
      filterType: ""
    });
    expect(wrapper.html()).toContain("button");
  });
});
