// Filter function
$('#input-filter').keyup(function() {
    const query = $(this).val().toLowerCase();
    $.each($('.row'), (index, item) => {
        if ($(item).text().toLowerCase().indexOf(query) === -1) {
            $(item).hide();
        } else {
            $(item).show();
        }
    });
});

// Remove button
$('.btn-delete').on('click', function() {
    const id = $(this).data('id');
    $(`#${id}`).remove();
    $.ajax({
      method: "delete",
      url: `/user/delete/${id}`
    })
    .done(() => console.log('User deleted!'));
});

let editing_id = null;

// Open edit modal
$('.btn-edit').on('click', function() {
    const id = $(this).data('id');
    ['name', 'surname', 'phone', 'email'].forEach(
        field => $(`.${field}`).val($(`#${id} .td-${field}`).text())
    );
    editing_id = id;
});

// Save changes
$('.btn-save').on('click', function() {
    const id = editing_id;
    const data = {id};
    ['name', 'surname', 'phone', 'email'].forEach(
        field => {
            $(`#${id} .td-${field}`).text($(`.${field}`).val());
            data[field] = $(`.${field}`).val();
        }
    );
    $.ajax({
      method: "put",
      url: `/user/put/${id}`,
      data
    })
    .done(() => console.log('User edited!'));
});
