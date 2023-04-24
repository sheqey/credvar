const encryptionKey = {
    a: "vv",
    b: "4d",
    c: "t8",
    d: "r5",
    e: "lf",
    f: "t9",
    g: "p3",
    h: "p8",
    i: "0f",
    j: "1k",
    k: "h5",
    l: "2s",
    m: "b7",
    n: "q3",
    o: "6a",
    p: "g6",
    q: "8d",
    r: "u4",
    s: "v9",
    t: "7e",
    u: "j6",
    v: "c4",
    w: "y9",
    x: "z4",
    y: "a2",
    z: "s1",
    0: "o2",
    1: "m3",
    2: "n4",
    3: "q5",
    4: "e3",
    5: "f8",
    6: "l9",
    7: "i5",
    8: "r1",
    9: "k2"
  };
  
  // Decryption key object
  const decryptionKey = Object.fromEntries(
    Object.entries(encryptionKey).map(([key, value]) => [value, key])
  );
  
  // Encryption function
  function encrypt(input) {
    let result = "";
    for (let i = 0; i < input.length; i++) {
      const char = input[i].toLowerCase();
      if (encryptionKey[char]) {
        result += encryptionKey[char];
      } else {
        result += char;
      }
    }
    return result;
  }
  
  // Decryption function
  function decrypt(input) {
    let result = "";
    let i = 0;
    while (i < input.length) {
      const char = input.slice(i, i + 2);
      if (decryptionKey[char]) {
        result += decryptionKey[char];
        i += 2;
      } else {
        result += input[i];
        i++;
      }
    }
    return result;
  }
  
  // Handle form submission
  const form = document.getElementById("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");
    if (document.getElementById("encrypt").checked) {
      output.value = encrypt(input);
    } else {
      output.value = decrypt(input);
    }
    // Show output popup
    const popup = document.getElementById("popup");
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  });
  