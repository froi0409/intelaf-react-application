import Swal from "sweetalert2";

export const errorNotification = (message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#3D3759",
    color: "#fff",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "error",
    title: message
  });
}


export const successNotification = (message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
    background: "#3D3759",
    color: "#fff",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: message
  });
}

export const successNotificationWithAction = (message: string, action: any) => {
  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: "center",
  //   showConfirmButton: false,
  //   timer: 3000,
  //   background : "#3D3759",
  //   color: "#fff",
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //     toast.onmouseenter = Swal.stopTimer;
  //     toast.onmouseleave = Swal.resumeTimer;
  //   }
  // });
  Swal.fire({
    icon: "success",
    title: message,
    background: "#3D3759",
    color: "#fff",
    confirmButtonText: "Regresar",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      action();
    }
  });
}