<template>
    <div class="container py-5">
        <h3 class="d-inline-block">Sorting Training System</h3>
        <button class="btn btn-sm btn-primary float-right" @click="onStartSortingClick">Start sorting!</button>
        <label v-if="generatedUserList.length > 0" class="d-inline-block w-100 text-right mt-4">{{ generatedUserList.length }} people in the list</label>
        <div v-if="generatedUserList.length > 0">
            <div class="card">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-4 font-weight-bold">Name</div>
                        <div class="col-4 font-weight-bold">Email</div>
                        <div class="col-4 font-weight-bold">Potatoes</div>
                    </div>
                </div>
            </div>
            <draggable v-model="generatedUserList" @end="onDragUserRow">
                <div v-for="(item, index) in generatedUserList" :key="index" class="grab">
                    <div class="card no-top-border" :class="{ 'bg-grey': index % 2 === 0 }">
                        <div class="card-body p-3">
                            <div class="row">
                                <div class="col-4">{{ item.Name }}</div>
                                <div class="col-4">{{ item.Email }}</div>
                                <div class="col-4">{{ item.PotatoCount }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>
        <small v-if="generatedUserList.length === 0" class="d-inline-block w-100 text-center">Please click on start sorting.</small>
    </div>
</template>

<script>

import draggable from 'vuedraggable'
import ModalView from './modal-view.vue'
import ResultView from '../result-view.vue'
import UserDataset from '../../infrastructure/RandomDataset'

export default {
  name: 'TrainingView',
  data () {
    return {
      dataset: UserDataset.RANDOM_USER_LIST,
      generatedUserList: [],
      timer: null,
      totalSeconds: 0,
      randomNumbers: []
    }
  },
  components: { draggable },
  methods: {
    getRandomNumber() {
        var randomNumber = Math.floor(Math.random() * 105)
        if (this.randomNumbers.includes(randomNumber)) {
            return this.getRandomNumber()
        }
        else {
            return randomNumber
        }
    },
    isSortedList () {
        if (this.generatedUserList.length > 0) {
            var vm = this
            for(var first_index = 1; first_index < vm.generatedUserList.length; first_index++) {
                if(vm.generatedUserList[first_index - 1].PotatoCount < vm.generatedUserList[first_index].PotatoCount) {
                    return false
                }
            }
            return true
        }
        return false
    },
    onStartSortingClick () {
      this.$modal.show(ModalView, {
        handlers: {
          actionConfirmed: (people_number) => {
            this.generateDataset(people_number)
          }
        }
      })
    },
    generateDataset (people_number) {
        this.generatedUserList = []
        this.randomNumbers = []
        for(var it = 1; it <= people_number; it++) {
            var randomNumber = this.getRandomNumber()
            this.randomNumbers.push(randomNumber)
            var user = this.dataset[randomNumber]
            user.PotatoCount = randomNumber
            this.generatedUserList.push(user)
        }
        this.startTimer()
    },
    startTimer () {
        var vm = this
        vm.totalSeconds = 0
        vm.clearTimer()
        vm.timer = setInterval(function () {
            ++vm.totalSeconds
        }, 1000)
    },
    clearTimer () {
        if (this.timer) {
            clearInterval(this.timer)
        }
    },
    onDragUserRow () {
        if (this.isSortedList()) {
            this.generatedUserList = []
            this.clearTimer()
            this.showResultView(this.totalSeconds + 's')
        }
    },
    showResultView (elapsedTime) {
      this.$modal.show(ResultView, { elapsedTime: elapsedTime })
    }
  }
}
</script>

<style scoped>
    .no-top-border {
        border-top: none;
    }
    .bg-grey {
        background: #f3f3f3;
    }
</style>
