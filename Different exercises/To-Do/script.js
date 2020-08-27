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