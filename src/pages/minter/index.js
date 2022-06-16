import { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Fox from "../../components/fox";
import { connectWallet } from "../../utils/interact";
import { pinIMAGEtoIPFS } from "../../utils/pinata";
import "./style.css";

// Import das funções utilitárias e de interação com o piñata

const FormData = require("form-data");

const Minter = () => {
  const [isConnected, setConnectedStatus] = useState(false);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [releaseName, setReleaseName] = useState("");
  const [artwork, setArtwork] = useState("");
  const [artist, setArtist] = useState("");
  const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

  let data = new FormData();

  useEffect(() => {
    async function load() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          console.log(accounts);
          if (accounts.length > 0) {
            setConnectedStatus(true);
            setWallet(accounts[0]);
          } else {
            throw Error;
          }
        } catch (error) {
          setConnectedStatus(false);
          setStatus("Precisa conectar sua carteira do metamask");
        }
      } else {
        setStatus("Precisa instalar a extensão do metamask");
      }
    }

    load();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setConnectedStatus(walletResponse.connectedStatus);
    setStatus(walletResponse.status);
    if (isConnected) {
      setWallet(walletResponse.address);
    }
  };
  const onMintPressed = async () => {};
  const artworkHandleChange = async (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        data.set("file", selectedFile);
        const pinataResponse = await pinIMAGEtoIPFS(data);
        if (pinataResponse.success) {
          setArtwork(pinataResponse.pinataUrl);
        }
      } else {
        setError("Tipo de arquivo não aceito.");
      }
    }
  };

  return (
    <div id="minter">
      <Header />
      <br />
      <br />
      <br />
      <br />

      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-md-2 col-sm-0" />
          <div className="col-md-4 col-sm-12 text-md-start text-sm-center  mt-2">
            <span className="fw-bolder title">NFT</span>
            <span className="title"> Minter</span>
            <br />
            <span className="text-muted subtitle fw-light text-md-start text-sm-center">
              Realize o Mint do seu NFT!
            </span>
          </div>

          <div className="col-md-2 col-sm-12 text-center mt-3 mt-md-0">
            <div id="metamask-face">
              {/* <Fox followMouse width={100} height={100} /> */}
            </div>
          </div>

          <div className="col-md-4 col-sm-12 text-md-start tex-sm-center connect-wallet-div mt-4 mt-md-auto mb-md-auto mb-4">
            <span onClick={connectWalletPressed}>
              {isConnected ? (
                <span className="wallet-button-connected">
                  {"✅ Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)}
                </span>
              ) : (
                <span className="wallet-button">Conectar Carteira 👛</span>
              )}
            </span>
          </div>
          <div className="col-2" />
        </div>

        {status ? (
          <div className="row mb-4 mt-5 mt-md-4">
            <div className="col-12">
              <div className="alert alert-secondary" role="alert">
                <span className="status">{status}</span>
              </div>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="row mb-4 mt-5 mt-md-4">
            <div className="col-12">
              <div className="alert alert-danger" role="alert">
                <span className="status">{error}</span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="col-1 col-md-2" />
          <div className="col-10 col-md-8 form-card">
            <div className="row text-center">
              <div className="col-12 text-center">
                <span className="text-muted card-title fw-light ">
                  Simplesmente adicione a imagem do seu NFT, título e artista e
                  depois aperte em "Mint"
                </span>
              </div>
            </div>

            <div className="row mt-5">
              <form className="text-start">
                <div className="row">
                  <div className="col-md-2 col-sm-1" />

                  <div className="col-md-8 col-sm-10">
                    <div className="mb-3">
                      <label htmlFor="artwork" className="form-title">
                        Arte do Projeto {artwork ? <span>✅</span> : null}
                      </label>

                      {artwork ? (
                        <span>
                          <br />
                          <img className="image-preview" src={artwork} />
                        </span>
                      ) : null}

                      <br />
                      <span className="text-muted form-subtitle fw-light">
                        Suporta JPG, PNG e GIF. Tamanho máximo de arquivo: 10MB.
                      </span>
                      <br />

                      {artwork ? (
                        <span className="text-muted form-url-subtitle fw-light">
                          {artwork}
                        </span>
                      ) : null}
                      <input
                        required
                        className="form-control mt-1"
                        id="artwork"
                        onChange={artworkHandleChange}
                        type="file"
                        disabled={artwork ? true : false}
                      />
                    </div>
                  </div>

                  <div className="col-md-2 col-sm-1" />
                </div>

                <div className="row">
                  <div className="col-md-2 col-sm-1" />

                  <div className="col-md-8  col-sm-10">
                    <div className=" mb-3">
                      <label htmlFor="release-name" className="form-title">
                        Nome do Lançamento{" "}
                        {releaseName ? <span>✅</span> : null}
                      </label>
                      <input
                        type="text"
                        required
                        onChange={(event) => setReleaseName(event.target.value)}
                        className="form-control form-control-lg"
                        id="release-name"
                        placeholder="e.g. My first Audio NFT!"
                      />
                    </div>
                  </div>

                  <div className="col-md-2 col-sm-1" />
                </div>

                <div className="row">
                  <div className="col-md-2 col-sm-1" />

                  <div className="col-md-8 col-sm-10">
                    <div className=" mb-3">
                      <label htmlFor="artist-name" className="form-title">
                        Nome do Artista {artist ? <span>✅</span> : null}
                      </label>
                      <input
                        type="text"
                        required
                        onChange={(event) => setArtist(event.target.value)}
                        className="form-control form-control-lg"
                        id="artist-name"
                        placeholder="e.g. My first Audio NFT!"
                      />
                    </div>
                  </div>

                  <div className="col-md-2 col-sm-1" />
                </div>

                <div className="row">
                  <div className="col-md-2 col-sm-1" />

                  <div className="col-md-8 col-sm-10">
                    {isConnected && artwork && artist && releaseName ? (
                      <span onClick={onMintPressed} className="btn btn-sm">
                        Mint NFT
                      </span>
                    ) : (
                      <button className="btn btn-sm" disabled>
                        Mint (carteira MetaMask não conectada)
                      </button>
                    )}
                  </div>

                  <div className="col-md-2 col-sm-1" />
                </div>
              </form>
            </div>
          </div>
          <div className="col-1 col-md-2" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Minter;
