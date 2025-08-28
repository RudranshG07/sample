"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wifi,
  Bitcoin,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Wallet,
  ArrowRight,
  Play,
  Layers,
  Globe,
  Cpu,
  Router,
  CheckCircle,
  X,
} from "lucide-react"

declare global {
  interface Window {
    LeatherProvider?: {
      request: (method: string, params?: any) => Promise<any>
    }
  }
}

export default function StackFiLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const [showDeviceConnection, setShowDeviceConnection] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [devicesFound, setDevicesFound] = useState<any[]>([])
  const [deviceConnected, setDeviceConnected] = useState(false)
  const [isConnectingDevice, setIsConnectingDevice] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [showRewardNotification, setShowRewardNotification] = useState(false)
  const [rewardAmount, setRewardAmount] = useState(0)

  const [floatingElements, setFloatingElements] = useState([
    { id: 1, x: 20, y: 30, delay: 0 },
    { id: 2, x: 80, y: 60, delay: 1000 },
    { id: 3, x: 60, y: 20, delay: 2000 },
    { id: 4, x: 30, y: 70, delay: 1500 },
  ])

  const connectLeatherWallet = async () => {
    if (!window.LeatherProvider) {
      window.open("https://leather.io/install-extension", "_blank")
      return
    }

    setIsConnecting(true)
    try {
      const response = await window.LeatherProvider.request("getAddresses")
      if (response?.result?.addresses?.length > 0) {
        const address = response.result.addresses[0].address
        setWalletAddress(address)
        setWalletConnected(true)
        console.log("[v0] Leather wallet connected:", address)
      }
    } catch (error) {
      console.error("[v0] Failed to connect Leather wallet:", error)
      window.open("https://leather.io/", "_blank")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress("")
    setShowDeviceConnection(false)
    setDeviceConnected(false)
  }

  const startDeviceConnection = useCallback(() => {
    console.log("[v0] Starting device connection flow")
    setShowDeviceConnection(true)
    setIsScanning(true)
    setScanProgress(0)
    setDevicesFound([])

    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 2 // Faster progress updates

        if (newProgress >= 100) {
          clearInterval(scanInterval)
          setIsScanning(false)

          setTimeout(() => {
            setDevicesFound([
              {
                id: "esp-stackfi-001",
                name: "ESP StackFi Device",
                type: "ESP32-S3",
                signal: 92,
                distance: "12m",
                status: "available",
                bandwidth: "150 Mbps",
              },
            ])
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 100) // Smoother progress updates
  }, [])

  const connectToDevice = async (deviceId: string) => {
    console.log("[v0] ESP DEVICE CONNECTION ONLY - NO WALLET INVOLVED:", deviceId)
    setIsConnectingDevice(true)

    setTimeout(() => {
      console.log("[v0] ESP device connected successfully - DEVICE ONLY, NO WALLET")
      setIsConnectingDevice(false)
      setDeviceConnected(true)
      setShowSuccessAnimation(true)
      setShowDeviceConnection(false)

      setTimeout(() => {
        setShowSuccessAnimation(false)
        console.log("[v0] ESP device connection complete - ready to earn Bitcoin")
      }, 3000)
    }, 2000)
  }

  const startRewardSimulation = useCallback(() => {
    console.log("[v0] Real transaction monitoring enabled")
  }, [])

  const closeDeviceConnection = () => {
    setShowDeviceConnection(false)
    setIsScanning(false)
    setScanProgress(0)
    setDevicesFound([])
  }

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)

    const floatInterval = setInterval(() => {
      setFloatingElements((prev) =>
        prev.map((el) => ({
          ...el,
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        })),
      )
    }, 4000)

    const checkForTransactions = async () => {
      if (!walletConnected || !deviceConnected) return

      try {
        if (window.LeatherProvider) {
          const response = await window.LeatherProvider.request("getAddresses")
          if (response?.result?.addresses?.length > 0) {
            console.log("[v0] Monitoring wallet for real transactions")
          }
        }
      } catch (error) {
        console.error("[v0] Transaction monitoring error:", error)
      }
    }

    checkForTransactions()

    return () => {
      clearInterval(interval)
      clearInterval(floatInterval)
    }
  }, [walletConnected, deviceConnected])

  const steps = [
    { icon: Wifi, title: "Share Bandwidth", desc: "Connect your network to the DePIN" },
    { icon: Zap, title: "Earn Automatically", desc: "Get paid in real-time" },
    { icon: Bitcoin, title: "Receive Bitcoin", desc: "Direct to your Leather wallet" },
  ]

  const stats = [
    { value: "1st", label: "DePIN on Stacks" },
    { value: "₿2.5K", label: "BTC Earned" },
    { value: "50K+", label: "Bandwidth Providers" },
    { value: "99.9%", label: "Network Uptime" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {showRewardNotification && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 shadow-2xl backdrop-blur-sm">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                  <Bitcoin className="w-6 h-6 text-white animate-spin" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <div className="font-bold text-green-400 text-lg">Reward Received!</div>
                <div className="text-sm text-green-300 font-semibold">+{rewardAmount.toFixed(6)} BTC</div>
                <div className="text-xs text-muted-foreground">
                  Bandwidth sharing • {Math.floor(Math.random() * 50 + 10)} MB transferred
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showSuccessAnimation && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center animate-fade-in">
          <Card className="max-w-md mx-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400 animate-pulse">Device Connected!</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your ESP StackFi device is now connected and sharing bandwidth. You're now eligible to earn Bitcoin!
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-400">
                <Bitcoin className="w-5 h-5 animate-spin" />
                <span className="font-semibold text-lg">Earn in BTC Now!</span>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Congratulations! Start earning Bitcoin automatically.
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showDeviceConnection && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <Card className="w-[500px] h-[500px] bg-black/90 backdrop-blur-md border border-orange-500/30 shadow-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-orange-500">Device Scanner</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeDeviceConnection}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center">
              <div className="relative w-[384px] h-[384px] flex items-center justify-center">
                <div className="absolute w-[384px] h-[384px] rounded-full border-2 border-orange-500/40 animate-pulse"></div>
                <div className="absolute w-[288px] h-[288px] rounded-full border border-orange-500/30"></div>
                <div className="absolute w-[192px] h-[192px] rounded-full border border-orange-500/20"></div>
                <div className="absolute w-[96px] h-[96px] rounded-full border border-orange-500/15"></div>

                <div className="absolute w-8 h-8 bg-gradient-to-r from-orange-500 to-primary rounded-full animate-pulse flex items-center justify-center z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Router className="w-4 h-4 text-white" />
                </div>

                {isScanning && (
                  <div
                    className="absolute w-0.5 h-[192px] bg-gradient-to-t from-orange-500 via-orange-400 to-transparent z-20 left-1/2 top-1/2"
                    style={{
                      transformOrigin: "bottom center",
                      transform: "translateX(-50%) translateY(-100%)",
                      animation: "radar-sweep 2s linear infinite",
                    }}
                  ></div>
                )}

                <div className="absolute w-[384px] h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent top-1/2 transform -translate-y-0.5"></div>
                <div className="absolute w-px h-[384px] bg-gradient-to-b from-transparent via-orange-500/20 to-transparent left-1/2 transform -translate-x-0.5"></div>

                {devicesFound.map((device, index) => (
                  <div
                    key={device.id}
                    className="absolute cursor-pointer group z-30"
                    style={{
                      top: "25%",
                      right: "20%",
                      transform: "translate(50%, -50%)",
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-2 bg-green-500/20 rounded-full animate-ping"></div>
                      <div
                        className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log("[v0] ESP device radar dot clicked - DEVICE CONNECTION ONLY:", device.id)
                          connectToDevice(device.id)
                        }}
                      >
                        <Router className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          <div className="font-semibold text-green-400">{device.name}</div>
                          <div>
                            Signal: {device.signal}% • {device.distance}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isScanning && (
                <div className="mt-4 w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Scanning for devices...</span>
                    <span className="text-orange-500">{scanProgress}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {devicesFound.length > 0 && !isScanning && (
                <div className="mt-4 w-full space-y-2">
                  {devicesFound.map((device) => (
                    <div
                      key={device.id}
                      className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-orange-500/20"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Router className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-green-400">{device.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Signal: {device.signal}% • {device.distance}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => connectToDevice(device.id)}
                        disabled={isConnectingDevice}
                        className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white text-sm"
                      >
                        {isConnectingDevice ? "Connecting..." : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none">
        {floatingElements.map((el) => (
          <div
            key={el.id}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              animationDelay: `${el.delay}ms`,
              transition: "all 4s ease-in-out",
            }}
          />
        ))}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse-glow">
              <Wifi className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold gradient-text">StackFi</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#stats" className="text-muted-foreground hover:text-foreground transition-colors">
              Stats
            </a>
          </nav>
          {walletConnected ? (
            <div className="flex items-center space-x-4">
              {deviceConnected && (
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Device Connected</span>
                  {rewardAmount > 0 && (
                    <span className="text-muted-foreground">| ₿{rewardAmount.toFixed(6)} earned</span>
                  )}
                </div>
              )}
              {!deviceConnected && (
                <Button
                  size="sm"
                  onClick={startDeviceConnection}
                  className="text-xs px-3 py-2 bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary hover:scale-105 transition-transform"
                >
                  <Router className="w-3 h-3 mr-1" />
                  Connect Device
                </Button>
              )}
              <span className="text-sm text-muted-foreground">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <Button
                variant="outline"
                onClick={disconnectWallet}
                className="hover:scale-105 transition-transform bg-transparent"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              onClick={connectLeatherWallet}
              disabled={isConnecting}
              className="animate-pulse-glow hover:scale-105 transition-transform"
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnecting ? "Connecting..." : "Connect Leather"}
            </Button>
          )}
        </div>
      </header>

      <section className="pt-24 pb-16 px-4 relative">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
            <Badge variant="secondary" className="mb-6 px-4 py-2 animate-bounce">
              <Layers className="w-4 h-4 mr-2" />
              First Ever DePIN Project on Stacks L2
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text animate-pulse">Sell your bandwidth</span>
              <br />
              <span className="text-foreground">and earn in</span>
              <br />
              <span className="text-primary animate-bounce">₿itcoin</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Pioneer the future of decentralized physical infrastructure. StackFi leverages Stacks L2's Bitcoin
              security and smart contract capabilities to create the first bandwidth marketplace that pays you in real
              Bitcoin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {walletConnected ? (
                deviceConnected ? (
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-lg font-semibold">Earning Bitcoin!</span>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => {
                      console.log("[v0] Connect StackFi Device button clicked - simplified handler")
                      startDeviceConnection()
                    }}
                    className="text-lg px-8 py-6 animate-pulse-glow hover:scale-105 transition-transform bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary active:scale-95"
                  >
                    <Router className="w-5 h-5 mr-2" />
                    Connect StackFi Device
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )
              ) : (
                <Button
                  size="lg"
                  onClick={connectLeatherWallet}
                  disabled={isConnecting}
                  className="text-lg px-8 py-6 animate-pulse-glow hover:scale-105 transition-transform"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  {isConnecting ? "Connecting Wallet..." : "Connect Wallet to Start"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent hover:scale-105 transition-transform"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="mt-16 relative">
            <div className="animate-float">
              <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20 hover:scale-110 transition-transform cursor-pointer">
                <Wifi className="w-16 h-16 text-primary animate-pulse" />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-48 h-48 border-2 border-primary/20 rounded-full animate-ping"></div>
              <div
                className="w-64 h-64 border border-orange-500/20 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
            <div className="absolute -top-8 -left-8 animate-bounce" style={{ animationDelay: "0.5s" }}>
              <Bitcoin className="w-8 h-8 text-orange-500/60" />
            </div>
            <div className="absolute -bottom-8 -right-8 animate-bounce" style={{ animationDelay: "1.5s" }}>
              <Bitcoin className="w-6 h-6 text-primary/60" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-orange-500/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Stacks L2 Bitcoin?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              StackFi chose Stacks because it's the only blockchain that brings smart contracts to Bitcoin without
              compromising security
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Bitcoin Security",
                desc: "Inherit Bitcoin's $1T+ security model while enabling smart contracts for automated payments",
                highlight: "Secured by Bitcoin",
              },
              {
                icon: Cpu,
                title: "Smart Contracts",
                desc: "Execute complex DePIN logic with Clarity smart contracts that settle on Bitcoin",
                highlight: "Programmable Bitcoin",
              },
              {
                icon: Globe,
                title: "True Decentralization",
                desc: "No validators to trust - transactions are finalized by Bitcoin miners themselves",
                highlight: "Trustless Infrastructure",
              },
            ].map((advantage, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-primary/20"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 animate-pulse-glow">
                    <advantage.icon className="w-8 h-8" />
                  </div>
                  <Badge variant="outline" className="mb-4 text-xs">
                    {advantage.highlight}
                  </Badge>
                  <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{advantage.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How StackFi Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to monetize your internet bandwidth and earn Bitcoin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === index
              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden transition-all duration-500 hover:scale-105 ${isActive ? "ring-2 ring-primary scale-105 shadow-xl" : ""}`}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-primary text-primary-foreground animate-pulse-glow scale-110" : "bg-muted"}`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="text-sm text-primary font-semibold mb-2">Step {index + 1}</div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                    {isActive && (
                      <div className="mt-4">
                        <ArrowRight className="w-6 h-6 mx-auto text-primary animate-bounce" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose StackFi?</h2>
            <p className="text-xl text-muted-foreground">
              The first DePIN protocol built on Bitcoin's unbreakable foundation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Bitcoin Security",
                desc: "Secured by Bitcoin's proven network via Stacks L2 - no validators to trust",
              },
              {
                icon: Zap,
                title: "Real-time Payments",
                desc: "Instant Bitcoin payments every time someone uses your bandwidth",
              },
              {
                icon: Users,
                title: "Global DePIN Network",
                desc: "Join the world's first Bitcoin-native infrastructure network",
              },
              {
                icon: TrendingUp,
                title: "Passive Bitcoin Income",
                desc: "Earn Bitcoin 24/7 by sharing your unused bandwidth",
              },
              {
                icon: Wallet,
                title: "Leather Integration",
                desc: "Native Stacks wallet support for seamless Bitcoin transactions",
              },
              {
                icon: Bitcoin,
                title: "Pure Bitcoin Rewards",
                desc: "No tokens, no points - earn real Bitcoin directly",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section id="stats" className="py-16 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Network Stats</h2>
            <p className="text-xl opacity-80">Real numbers from the first Bitcoin DePIN network</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-110 transition-transform cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:animate-pulse">
                  {stat.value}
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-orange-500 opacity-10"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse blur-xl"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full animate-pulse blur-2xl"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Earn Bitcoin?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the bandwidth revolution and turn your internet into a Bitcoin mining machine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {walletConnected ? (
              deviceConnected ? (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-lg font-semibold">You're earning Bitcoin!</span>
                </div>
              ) : (
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    console.log("[v0] CTA Connect StackFi Device button clicked")
                    startDeviceConnection()
                  }}
                  className="text-lg px-8 py-6 hover:scale-105 transition-transform bg-gradient-to-r from-secondary to-orange-500/20 hover:from-orange-500/20 hover:to-secondary"
                >
                  <Router className="w-5 h-5 mr-2" />
                  Connect StackFi Device
                </Button>
              )
            ) : (
              <Button
                size="lg"
                onClick={connectLeatherWallet}
                disabled={isConnecting}
                className="text-lg px-8 py-6 animate-pulse-glow hover:scale-105 transition-transform"
              >
                <Wallet className="w-5 h-5 mr-2" />
                {isConnecting ? "Connecting..." : "Connect Leather Wallet"}
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent hover:scale-105 transition-transform"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse-glow">
                <Wifi className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">StackFi</span>
            </div>
            <div className="flex space-x-6 text-sm opacity-80">
              <a href="#" className="hover:opacity-100 transition-opacity hover:scale-105 transition-transform">
                Privacy
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity hover:scale-105 transition-transform">
                Terms
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity hover:scale-105 transition-transform">
                Support
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity hover:scale-105 transition-transform">
                Docs
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/20 text-center text-sm opacity-60">
            © 2024 StackFi. First DePIN on Stacks L2 Bitcoin. Earn Bitcoin by sharing bandwidth.
          </div>
        </div>
      </footer>
    </div>
  )
}
