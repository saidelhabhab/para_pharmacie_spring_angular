$(function () {
    dragula([document.getElementById("draggable-area")]),
      dragula([document.getElementById("card-colors")])
        .on("drag", function (e) {
          e.className = e.className.replace("card-moved", "");
        })
        .on("drop", function (e) {
          e.className += " card-moved";
        })
        .on("over", function (e, t) {
          t.className += " card-over";
        })
        .on("out", function (e, t) {
          t.className = t.className.replace("card-over", "");
        }),
      dragula(
        [
          document.getElementById("copy-left"),
          document.getElementById("copy-right"),
        ],
        {
          copy: !0,
        }
      ),
      dragula(
        [
          document.getElementById("left-handles"),
          document.getElementById("right-handles"),
        ],
        {
          moves: function (e, t, n) {
            return n.classList.contains("handle");
          },
        }
      ),
      dragula(
        [
          document.getElementById("left-titleHandles"),
          document.getElementById("right-titleHandles"),
        ],
        {
          moves: function (e, t, n) {
            return n.classList.contains("titleArea");
          },
        }
      );
  });
  