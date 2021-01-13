let $list = $('ul');
let $input = $('input');
let $button = $('.button');
$button.click((event) => {
    let $li = $('<li>').text($input.val());
    let $content = $('<div>');
    let $checkbox = $('<input>').attr({'type': 'checkbox'});
    $checkbox.change(event => {
        if ($checkbox.prop('checked')) event.target.nextSibling.style.textDecoration = 'line-through';
        else  event.target.nextSibling.style.textDecoration = 'none';
    });
    let $delete = $('<div>').attr({'class': 'button'}).text('delete');
    $delete.click((event) => event.target.parentNode.remove());
    $content.append($checkbox).append($li).append($delete).css({'display': 'flex', 'align-items': 'center', 'width': '30%', 'justify-content': 'space-between'});
    $list.append($content);
    $input.val('');
});


// The part for To Do list written in Vue.js


// Mocks representing backend structure
let todoList = [
    {id: 0, isDone: false, todo: 'Buy milk'},
    {id: 2, isDone: true, todo: 'Buy bread'},
    {id: 3, isDone: false, todo: 'Complete todo list page'},
    {id: 4, isDone: false, todo: 'Complete styling for todo'},
    {id: 5, isDone: false, todo: 'Buy AWS Pro account'},
];

let tags = [
    {id: 0, tag: 'Shopping'},
    {id: 1, tag: 'Programming'},
];

let todoListTags = [
    {id: 0, todoId: 0, tagId: 0},
    {id: 1, todoId: 2, tagId: 0},
    {id: 2, todoId: 3, tagId: 1},
    {id: 3, todoId: 4, tagId: 1},
    {id: 4, todoId: 5, tagId: 0},
    {id: 5, todoId: 5, tagId: 1},
];

const component = Vue.component('app-task', {
    template: `
        <li>
            <input type="checkbox" :checked="task.isDone" @change="task.isDone = !task.isDone"> 
            <strong>{{ task.todo }}</strong>
            <span class="tag" v-for="tag in tags" v-if="tag.tag">{{ tag.tag }}</span>
        </li>
        `,
    data: function() {
        return {
            // empty object as all the data comes from parent. data may be deleted from config
        }
    },
    props: {
        task: {
            isDone: Boolean,
            todo: String
        },
        tags: Array
    }

})

let vue = new Vue({
    el: '#vue_todo',
    data: function() {
        return {
            todoList: todoList,
            todoInput: '',
            todoTags: ''
        }
    },
    methods: {
        addTask: function() {
            if (!this.todoInput) return null;
            let id = this.todoList.length > 0 ? this.todoList[this.todoList.length - 1].id + 1 : 0;
            this.todoList.push({ id: id, isDone: false, todo: this.todoInput });
            return id;
        },
        addTag: function() {
            let taskTags = this.todoTags.split(',');
            let tagIds = [];
            taskTags.forEach(element => {
                element = element ? element.trim() : '';
                for (let tag of this.tags) {
                    if (tag.tag !== element) continue;
                    else {
                        tagIds.push(tag.id);
                        return;
                    }
                }
                tags.push({ id: tags.length, tag: element });
                tagIds.push(tags.length - 1);
            });
            return tagIds;
        },
        addTodo: function() {
            let taskId = this.addTask();
            if (!taskId) return;
            let tagIds = this.addTag();
            tagIds.forEach(el => {
                todoListTags.push({id: todoListTags.length, todoId: taskId, tagId: el})
            });
        },
        getTags: function(taskId) {
            let taskTags = [];
            for (let item of todoListTags) {
                if (item.todoId === taskId) taskTags.push(tags.filter(el => el.id == item.tagId)[0]); //such awkward constructions would be avoided in real projects with backend  via 'SELECT ... WHERE' query to DB
            }
            return taskTags;
        }
    }
})