$(function () {
  $.ajax({
    url: "https://dummyjson.com/products/search?q=phone",
    method: "GET",
    beforeSend: function () {
      $("#loader").show();
    },
    success: function (data) {
      $("#loader").hide();
      const res = data.products;
      res.map((i) => {
        $("#content").append(`
        <div class="product-card">
            <div class="product-id">#${i.id}</div>
            <img src=${i.thumbnail} />
            <h2 class="product-title">${i.title}</h2>
            <p class="product-desc">${i.description}</p>

            <div class="product-footer">
                <span class="price">$${i.price}</span>
                <span class="rating">${i.rating}&star;</span>
            </div>
        </div>
      `);
      });
    },
    error: function (err) {
      const error = JSON.stringify(err);
      console.log(error);
      $("#content").append(`
        <center>Something Went Wrong</center>
        `);
    },
  });
});
